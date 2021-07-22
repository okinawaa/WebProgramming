import React, {useContext} from 'react';
import {GlobalState} from "../../../GlobalState";
import ProductsAPI from "../../../api/ProductsAPI";

function Filters(props) {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e =>{
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <select name="category" value={category} onChange={handleCategory}>
                    <option value=''> Category</option>
                    {
                        categories.map(category=>(
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <input type="text" value={search} placeholder="Search" onChange={e => setSearch(e.target.value.toLocaleLowerCase())}/>

            <div className="row sort">
                <select  value={sort} onChange={e => setSort(e.target.value)}>
                    <option value=''> Sort</option>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best sales</option>
                    <option value="sort=-price">Price : High-Low</option>
                    <option value="sort=price">Price : Low-High</option>
                </select>
            </div>

        </div>
    );
}

export default Filters;