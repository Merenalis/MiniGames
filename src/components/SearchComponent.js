import React, {useState} from 'react';
import {
        FormControl,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import _useCustomEventListener from "../utils/use-custom-event-listener";

const SearchComponent = ({searchFunc,sortGamesData}) => {
    const [sort, setSort] = useState('createdAt');

    _useCustomEventListener('setSortToDefault', () => setSort('createdAt'))

    const handleChange = (event) => {
        setSort(event.target.value);
        sortGamesData(event.target.value)
    };

    function handleSearch(event) {
        const {search} = event.target.elements
        event.preventDefault()
        searchFunc(search.value)
    }

    return (
        <>
            <FormControl onSubmit={handleSearch} sx={{margin: '0 10px 15px 15px'}}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search..."
                        autoFocus
                        name='search'
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
                    sx={{height:'48px'}}
                    onChange={handleChange}
                >
                    <MenuItem value={'createdAt'}>Newest</MenuItem>
                    <MenuItem value={'rating'}>Rating</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};

export default SearchComponent;