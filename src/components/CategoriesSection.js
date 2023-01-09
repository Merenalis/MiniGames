import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import categories from "../mocks/categories";

import '../styles/CategoriesSection.scss'

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    paddingLeft: 15,
    paddingRight: 15,
    width: '130px',
    '&.selected':{
        background: 'wheat',
    }
}));

const CategoriesSection = ({updateData,categorySelect}) => {
    const [selectedId, setSelectedId] = useState();
    
    useEffect(()=>{
        setSelectedId(categorySelect);
    }, [categorySelect])

    const handleClick = id => e => {
        setSelectedId(id);
        updateData(id)
    };

    return (
        <div className="categories-section-wrapper">
            {
                categories.map((item) => {
                    return (
                        <Item key={item.id} className={item.id === selectedId ? 'selected' : null} onClick={handleClick(item.id)}>
                            {item.name}
                        </Item>
                    )
                })
            }
        </div>
    );
};

export default CategoriesSection;