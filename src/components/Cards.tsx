import { Component } from "solid-js";



const Cards: Component = () => {
    return (
        <div display-flex>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}


const Card: Component = () => {
    return (
        <div class="display-flex flex-center-center  flex-1  min-h-400px bg-5999B3C0 hover:bg-5999B390">

            <div class="fs-30px fw-bold f-white">Card</div>

        </div>
    )
}


export default Cards;