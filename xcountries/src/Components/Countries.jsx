import { useEffect, useState } from 'react';
import styles from './Countries.module.css'

const CountryCard = ({ name, flag }) => {
    return (
        <div className={styles.card}>
            <img src={flag} alt={name} className={styles.flagImage} />
            <p className={styles.countryName}>{name}</p>
        </div>
    )
}

export default function Countries() {

    let URL = "https://xcountries-backend.azurewebsites.net/all";
    let [data, setData] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                let response = await fetch(URL);
                let data = await response.json();
                setData(data);

            } catch (error) {
                console.error(`Error fetching data:${error}`)
            }
        }
        fetchCountries();
    }, [])

    return (
        <div className={styles.countriesPage}>
            {data.map((ele, idx) => <CountryCard name={ele.name} flag={ele.flag} key={`${idx + ele.name}`} />)}
        </div>
    )
}