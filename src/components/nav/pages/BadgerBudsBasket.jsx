import React, { useContext, useState } from 'react';
import BadgerBudSummary from './BadgerBudSummary.jsx';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext.js';
import { Container, Col, Row } from 'react-bootstrap';

export default function BadgerBudsBasket(props) {
    const [catMoved, setCatMoved] = useState(false); // used only to force hot reload when moving cats in and out of basket or adopted

    const buddies = useContext(BadgerBudsDataContext);

    // set to empty array if JSON.parse is null
    const savedBasketCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || []; 
    const savedAdoptedCatsIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || []; 
    const savedBuddies = buddies
        .filter(buddy => savedBasketCatIds.includes(buddy.id))
        .filter(buddy => !(savedAdoptedCatsIds.includes(buddy.id)));

    return <div>

        <Container fluid style={{ backgroundColor: "rgba(255, 192, 203, 0.5)"}}>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could be all yours!</p>
            
            {savedBuddies.length === 0 && 
                <p> You have no buds in your basket! </p>}
            
            <Row>
                {savedBuddies.map(buddy => (
                    <Col key={buddy.id} xs={12} sm={12} md={6} lg={4} xl={3} > 
                        <div>
                            < BadgerBudSummary buddy={buddy} hotReload={catMoved} forceHotReload={setCatMoved} />
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
}