import React from 'react';
import './App.css';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';


// https://kovan.infura.io/v3/f06d893015544e85b4c3e99d3e5eff7d
function App(){


  // const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [marketplace, setMarketplace] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [productList, setProducts] = useState([]);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    // setLoading(true);
    // if(
    //   typeof window.ethereum == "undefined" ||
    //   typeof window.web3 == "undefined"
    // ){
    //   return;
    // }
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    // if (accounts.length == 0) {
    //   return;
    // }
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId]
    if (networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address);
      // console.log(marketplace);
      setMarketplace(marketplace);
      const productCount = await marketplace.methods.productCount().call();
      console.log(productCount.toString());
      setProductCount(productCount);

      // var tempProd = new Array();
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        console.log(typeof product);
        // tempProd.push(product);
        setProducts(productList => [...productList, product]);
        // console.log(productList);
      }
      // setProducts(productList => [...productList, tempProd]);
      setLoading(false);
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
      // setloading2(true);
    }
  };

  const createProduct = (name, price) => {
    setLoading(true);
    marketplace.methods.createProduct(name, price).send({ from: account })
      .once('receipt', (receipt) => {
        setLoading(false);
      });
  };

  const purchaseProduct= (id, price) => {
    setLoading(true);
    marketplace.methods.purchaseProduct(id).send({ from: account, value: price })
      .once('receipt', (receipt) => {
        setLoading(false);
      })
  }

  // useEffect(() => {
  //   loadWeb3();
  //   loadBlockchainData();

  //   // if(refresh == 1) {
  //   //   setRefresh(0);
  //   //   loadBlockchainData();
  //   // }
  // });
  
  return (
    <div>
      <Navbar account={account} />

       <Home 
       loading={loading} 
       createProduct={createProduct} 
       purchaseProduct={purchaseProduct} 
       productList={productList}/>
       <Footer/>
    </div>

  );
}

export default App;