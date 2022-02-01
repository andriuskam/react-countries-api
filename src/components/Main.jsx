import React, {useState, useEffect} from "react";
import {Button} from 'react-bootstrap';
import SpinnerAnimation from "./SpinnerAnimation";
import { Accordion } from "react-bootstrap";
import Search from "./Search";


export default function Main() {

    const [regionType, setRegionType] = useState('all');
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState([])
    const [searchInp, setSearchInp] = useState("")

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch(`https://restcountries.com/v3.1/${ regionType }`);
            const countries = await response.json();
            setCountries(countries);
            setLoading(false);
        };
        fetchCountries();
    }, [regionType])

    const searchCountries = (searchValue) =>{
        setSearchInp(searchValue)

        if(searchInp){
            const filteredCountries = countries.filter((country)=>
            Object.values(country).join("").toLowerCase().includes(searchValue.toLowerCase()))
        setFiltered(filteredCountries)
        }else{
            setFiltered(countries)
        }
    }

    return (
        <>
            <nav className="nav">
                <h1 className="title">Countries API</h1>
                <div className="buttonGroup">
                    <Button className="countryBtn" onClick={() => setRegionType('all')}>All</Button>
                    <Button className="countryBtn" onClick={() => setRegionType('region/africa')}>Africa</Button>
                    <Button className="countryBtn" onClick={() => setRegionType('region/americas')}>America</Button>
                    <Button className="countryBtn" onClick={() => setRegionType('region/asia')}>Asia</Button>
                    <Button className="countryBtn" onClick={() => setRegionType('region/europe')}>Europe</Button>
                    <Button className="countryBtn" onClick={() => setRegionType('region/oceania')}>Oceania</Button>
                </div>
                <Search searchCountries ={searchCountries} searchInp={searchInp}/>
            </nav>
            {
                loading ? 
                <SpinnerAnimation /> :
                <>
                    {searchInp.length > 0 ?
                        <section>
                            {
                                filtered.map((country, index) => {
                                    
                                    const name = country.name.common;
                                    const flag = country.flags.png;
                                    const population = country.population;
                                    const area = country.area;
                                    const currencies = country.currencies; 
                                    const languages = country.languages;
                                    const borders = country.borders;

                                    return (
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey={index} className="my-1 shadow-sm" >
                                                <Accordion.Header>
                                                    <div className="header">
                                                        <img src={flag} alt={name}/>
                                                        <h2>{name}</h2>
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="body">
                                                        <h2><span>Population:</span> {population} citizens.</h2>
                                                        <h2><span>Area:</span> {area} km<sup>2</sup>.</h2>
                                                        <h2><span>Currencies:</span> { currencies ? Object.values(currencies).map(value => {return `${value.name}` + " " + `( ${value.symbol} ) `}) : "No currencies to show." }</h2>
                                                        <h2><span>Languages:</span> { languages ? Object.values(languages).map(value => {return `${value} `}) : "No languages to show." }</h2>
                                                        <h2><span>Borders:</span> { borders ? Object.values(borders).map(value => {return `${value} `}) : "This country has no borders with other countries." }</h2>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    )
                                })
                            }
                        </section>
                        :
                        <section>
                            {
                                countries.map((country, index) => {
                                    
                                    const name = country.name.common;
                                    const flag = country.flags.png;
                                    const population = country.population;
                                    const area = country.area;
                                    const currencies = country.currencies; 
                                    const languages = country.languages;
                                    const borders = country.borders;

                                    return (
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey={index} className="my-1 shadow-sm" >
                                                <Accordion.Header>
                                                    <div className="header">
                                                        <img src={flag} alt={name}/>
                                                        <h2>{name}</h2>
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="body">
                                                        <h2><span>Population:</span> {population} citizens.</h2>
                                                        <h2><span>Area:</span> {area} km<sup>2</sup>.</h2>
                                                        <h2><span>Currencies:</span> { currencies ? Object.values(currencies).map(value => {return `${value.name}` + " " + `( ${value.symbol} ) `}) : "No currencies to show." }</h2>
                                                        <h2><span>Languages:</span> { languages ? Object.values(languages).map(value => {return `${value} `}) : "No languages to show." }</h2>
                                                        <h2><span>Borders:</span> { borders ? Object.values(borders).map(value => {return `${value} `}) : "This country has no borders with other countries." }</h2>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    )
                                })
                            }
                        </section>
                    }
                </>
            }

        </>

    )
}