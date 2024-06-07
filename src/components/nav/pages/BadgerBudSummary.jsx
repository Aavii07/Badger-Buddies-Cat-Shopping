import React, { useState } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';

export default function BadgerBudSummary ({ buddy, parentType, forceHotReload, hotReload}) {

    const [buttonDisplay, setButtonDisplay] = useState(false);

    {/* Adoptable Buttons */}
    const toggleButtonDisplay = () => {
        setButtonDisplay(!buttonDisplay);
    };
    const handleSave = () => {    
        // const = get from session storage, push to new const (push ID to array), set back to sessions storage
        const savedCatIdsFromStorage = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];    
        const newSavedCatIds = [...savedCatIdsFromStorage, buddy.id];
        sessionStorage.setItem('savedCatIds', JSON.stringify(newSavedCatIds));

        forceHotReload(!hotReload);
        alert(`${buddy.name} has been added to your basket!`);
    };

    {/* Basket Buttons */}
    const handleUnselect = () => {
        const savedCatIdsFromStorage = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];    
        const newSavedCatIds = savedCatIdsFromStorage.filter(id => id !== buddy.id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(newSavedCatIds));

        forceHotReload(!hotReload);
        alert(`${buddy.name} has been removed from your basket!`);
    };
    const handleAdopt = () => {
        const adoptedCatIdsFromStorage = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
        const newAdoptedCatIds = [...adoptedCatIdsFromStorage, buddy.id];
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(newAdoptedCatIds));

        forceHotReload(!hotReload);
        alert(`${buddy.name} has been adopted!`);
    };


    
    const imgURL = `https://raw.githubusercontent.com/CS571-SU24/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`;

    return (
        <div>
            <div style={{ width: '17rem', height: '17rem', overflow: 'hidden', borderRadius: "10%", border: '0.2rem solid black' }}>
                {buttonDisplay ? (
                    <Carousel interval={8000}>
                        {buddy.imgIds.map(imgId => (
                            <Carousel.Item key={imgId}>
                                <img
                                    src={`https://raw.githubusercontent.com/CS571-SU24/hw5-api-static-content/main/cats/${imgId}`}
                                    alt={`A picture of the cat ${buddy.name}`}
                                    style={{ width: "100%", height: "100%", aspectRatio: "1/1" }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <Card.Img
                        src={imgURL}
                        alt={`A picture of the cat ${buddy.name}`}
                        style={{ width: "100%", height: "100%", aspectRatio: "1/1" }}
                    />
                )}
            </div>
            
            <h2>{buddy.name}</h2>

            { parentType === "Adoptable" ? (
                <div> {/* buttons for BadgerBudsAdoptable */}
                    <Button 
                        style={{ marginBottom: "1rem" }} 
                        variant="primary" 
                        onClick={toggleButtonDisplay}>
                            {buttonDisplay ? "Show Less" : "Show More"}
                    </Button>
                    <Button 
                        style={{ marginBottom: "1rem", marginLeft: "0.25rem" }} 
                        variant="secondary"
                        onClick={handleSave}>
                            Save
                    </Button> 
                </div> ) : (
                <div> {/* buttons for BadgerBudsBasket */}
                    <Button 
                        style={{ marginBottom: "1rem", backgroundColor: "red"}} 
                        variant="secondary"
                        onClick={handleUnselect}>
                            Unselect
                    </Button>
                    <Button 
                        style={{ marginBottom: "1rem", marginLeft: "0.25rem", backgroundColor: "green" }} 
                        variant="secondary"
                        onClick={handleAdopt}>
                            Adopt
                    </Button> 
                </div>    
             )}

            {buttonDisplay && (<div>
                <Card 
                    border="primary" 
                    style={{ borderWidth: "0.2rem", borderStyle: "solid", 
                    borderColor: "blue", marginBottom: "1rem", padding: "0.5rem", 
                    backgroundColor: "rgba(173, 216, 230, 0.5)"}}>

                        <strong>{buddy.gender}</strong> <br />
                        {buddy.breed}<br />
                        {buddy.age} <br />
                        {buddy.description && <strong>About me:</strong>}<br />
                        {buddy.description && buddy.description} {/* display description if exists (true) */}
                </Card>
            </div>)}
        </div>
    );
}