import React from 'react';
import {
    Divider,
    FormControl,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = ({searchFunc,sortGamesData}) => {
    const [sort, setSort] = React.useState('createdAt');

    const handleChange = (event) => {
        setSort(event.target.value);
        console.log(event.target.value)
        sortGamesData(event.target.value)
    };
    function handleSearch(event) {
        const {search} = event.target.elements
        event.preventDefault()
        searchFunc(search.value)
    }

    return (
        <div>
            <FormControl onSubmit={handleSearch}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search..."
                        autoFocus
                        name='search'
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>

            </Paper>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort"
                    onChange={handleChange}
                >
                    <MenuItem value={'createdAt'}>Newest</MenuItem>
                    <MenuItem value={'rating'}>Rating</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SearchComponent;