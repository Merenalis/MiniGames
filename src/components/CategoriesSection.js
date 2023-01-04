import React from 'react';
import '../styles/CategoriesSection.scss'
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import categories from "../mocks/categories";

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
    paddingRight: 15
}));
const CategoriesSection = () => {
    return (
        <div className="categories-section-wrapper">
            {
                categories.map((item) => {
                    return (
                        <Item key={item.id}>
                            {item.name}
                        </Item>
                    )

                })
            }

        </div>
    );
};

export default CategoriesSection;