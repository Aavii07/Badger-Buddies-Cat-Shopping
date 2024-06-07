import React, { useContext, useState } from 'react';
import BadgerBudSummary from './BadgerBudSummary.jsx';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext.js';
import { Container, Col, Row } from 'react-bootstrap';

export default function BadgerBudsAdoptable(props) {
    const [catMoved, setCatMoved] = useState(false); // used only to force hot reload when moving cats in and out of basket or adopted
    const buddies = useContext(BadgerBudsDataContext);

    const savedBasketCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || []; 
    const savedAdoptedCatsIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || []; 
    const availableBuddies = buddies
        .filter(buddy => !(savedBasketCatIds.includes(buddy.id)))
        .filter(buddy => !(savedAdoptedCatsIds.includes(buddy.id)));

    return <Container fluid style={{ backgroundColor: "rgba(255, 192, 203, 0.5)"}}>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>

        {availableBuddies.length === 0 && 
            <p> No buds are available for adoption! </p>}
        
        <Row>
            {availableBuddies.map(buddy => (
                <Col key={buddy.id} xs={12} sm={12} md={6} lg={4} xl={3} > 
                    <div>
                        <BadgerBudSummary buddy={buddy} parentType={"Adoptable"} 
                        forceHotReload={setCatMoved} hotReload={catMoved}/>
                    </div>
                </Col>
            ))}
        </Row>
    </Container>
}