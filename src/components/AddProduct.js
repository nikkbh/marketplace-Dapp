import React, { useState } from 'react';

const AddProduct = ({createProduct}) => {

    const [pname, setPname] = useState('');
    const [pprice, setPprice] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const productName = pname;
        const productPrice = window.web3.utils.toWei(pprice.toString(), 'Ether');
        createProduct(productName, productPrice);
        // const name = this.productName.value
        // const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mr-sm-2">
                <input
                    id="productName"
                    type="text"
                    value={pname}
                    onChange={(e) => setPname(e.target.value)}
                    className="form-control"
                    placeholder="Product Name"
                    required />
            </div>
            <div className="form-group mr-sm-2">
                <input
                    id="productPrice"
                    type="text"
                    value={pprice}
                    onChange={(e) => setPprice(e.target.value)}
                    className="form-control"
                    placeholder="Product Price"
                    required />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
    );
}

export default AddProduct;