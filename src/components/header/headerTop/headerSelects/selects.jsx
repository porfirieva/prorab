import '../../header.sass';
import { useEffect, useReducer, useState } from "react";
import { components } from 'react-select';
import AsyncSelect from "react-select/async";
import axios from "axios";
import { token } from "../../../../App";


export const customStyles = {
    control: () => ({
        width: '100%',
        display: 'flex',
        background: '#F6F8F9',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        height: 60,
        paddingLeft: 12,
        paddingRight: 18,
    }),
    container: () => ({
        'position': 'relative',
    }),
    valueContainer: () => ({
        'display': 'flex',
        'flexDirection': 'row-reverse',
        'overflow': 'hidden',
        alignItems: 'center'
    }),
    placeholder: () => ({
        'fontFamily': 'Roboto',
        'fontSize': '14px',
        'fontWeight': '400',
        'lineHeight': '16px',
        'color': '#414253',
    }),
    indicatorSeparator: () => (
        {
            display: "none",
        }
    )
}

export const DropdownIndicator = (props) => {
    const { menuIsOpen } = props.selectProps;

    const caretClass = menuIsOpen ? 'caret-up' : 'caret-down';
    return (
        <components.DropdownIndicator {...props}>
            <div className={`${caretClass}`}>
                <svg width="16" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.11 3.945 6.435 9.27a2.048 2.048 0 0 0 2.899 0l5.325-5.325c1.295-1.296.37-3.516-1.46-3.516H2.55c-1.83 0-2.735 2.22-1.44 3.516Z" fill="#414253" /></svg>
            </div>
        </components.DropdownIndicator>
    );
};

const initialCount = {
    city: 10000,
    region: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'plus':
            return { city: state.city + 1, region: state.region + 1 }
    }
}

const SelectsDrop = props => {

    const [state, dispatch] = useReducer(reducer, initialCount); // Нужно для ререндера селектов
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleCountry = (value) => {
        setSelectedCountry(value)
        dispatch({ type: 'plus' });
        setSelectedRegion('');
        setSelectedCity('');
    }

    const handleRegion = value => {
        setSelectedRegion(value);
        dispatch({ type: 'plus' })
        setSelectedCity('');
    }

    const handleCity = value => {
        setSelectedCity(value);
    }
    useEffect(() => {
        props.getCity(selectedCity);
    }, [selectedCity])

    const loadOptions = (inputValue, callback) => {
        const options = [];
        axios.create({
            baseURL: 'https://cc19244api.tmweb.ru/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json",
                'Authorization': token,
            },
        }).get(`country`)
            .then((response) => {
                console.log(response.data)
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.name,
                        value: permission.id
                    })
                })
                callback(options.filter((i) =>
                    i.label.toLowerCase().includes(inputValue.toLowerCase())));
            })
    }

    const loadOptions2 = (inputValue, callback) => {
        let options = []
        axios.create({
            baseURL: 'https://cc19244api.tmweb.ru/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json",
                'Authorization': token,
            },
        }).get(`region?filter[country_id]=${selectedCountry.value}`)
            .then((response) => {
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.name,
                        value: permission.id
                    })
                })
                callback(options.filter((i) =>
                    i.label.toLowerCase().includes(inputValue.toLowerCase())));
            })
    }

    const loadOptions3 = (inputValue, callback) => {
        let options = []
        axios.create({
            baseURL: 'https://cc19244api.tmweb.ru/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json",
                'Authorization': token,
            },
        }).get(`city?filter[region_id]=${selectedRegion.value}`)
            .then((response) => {
                response.data.data.forEach((permission) => {
                    options.push({
                        label: permission.name,
                        value: permission.id
                    })
                })
                callback(options.filter((i) =>
                    i.label.toLowerCase().includes(inputValue.toLowerCase())));
            })
    }

    return (
        <div className="city__select">
            {/*{selectedCountry.value},*/}
            {/*{selectedRegion.value},*/}

            <AsyncSelect
                components={{ DropdownIndicator }}
                placeholder={"Выбор страны"}
                cacheOptions
                defaultOptions
                styles={customStyles}
                value={selectedCountry}
                onChange={handleCountry}
                loadOptions={loadOptions}
                noOptionsMessage={() => ''}
            />

            <AsyncSelect
                key={state.region}
                components={{ DropdownIndicator }}
                placeholder={"Выбрать регион"}
                cacheOptions
                defaultOptions
                styles={customStyles}
                value={selectedRegion}
                onChange={handleRegion}
                loadOptions={loadOptions2}
                noOptionsMessage={() => 'Выберите страну'}
            />

            <AsyncSelect
                key={state.city}
                components={{ DropdownIndicator }}
                placeholder={"Город"}
                cacheOptions
                defaultOptions
                styles={customStyles}
                value={selectedCity}
                onChange={handleCity}
                loadOptions={loadOptions3}
                noOptionsMessage={() => 'Выберите регион'}
            />
        </div>
    )

}
export default SelectsDrop;