App = {
  web3Provider: null,
  contracts: {},

  // init: async function() {
  //   // Load pets.
  //   $.getJSON('../pets.json', function(data) {
  //     var petsRow = $('#petsRow');
  //     var petTemplate = $('#petTemplate');

  //     for (i = 0; i < data.length; i ++) {
  //       petTemplate.find('.panel-title').text(data[i].name);
  //       petTemplate.find('img').attr('src', data[i].picture);
  //       petTemplate.find('.pet-breed').text(data[i].breed);
  //       petTemplate.find('.pet-age').text(data[i].age);
  //       petTemplate.find('.pet-location').text(data[i].location);
  //       petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

  //       petsRow.append(petTemplate.html());
  //     }
  //   });

  //   return await App.initWeb3();
  // },

  init: function() {
    return App.initWeb3();
  },

  // initWeb3: async function() {
  //   if (window.ethereum) {
  //     App.web3Provider = window.ethereum;
  //     try {
  //       // Request account access
  //       await window.ethereum.enable();
  //     } catch (error) {
  //       // User denied account access...
  //       console.error("User denied account access")
  //     }
  //   }
  //   // Legacy dapp browsers...
  //   else if (window.web3) {
  //     App.web3Provider = window.web3.currentProvider;
  //   }
  //   // If no injected web3 instance is detected, fall back to Ganache
  //   else {
  //     App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
  //   }
  //   web3 = new Web3(App.web3Provider);
  //   return App.initContract();
  // },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  // initContract: function() {
  //   /*
  //    * Replace me...
  //    */

  //   return App.bindEvents();
  // },

  initContract: function() {
    $.getJSON("Delivery.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Delivery = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Delivery.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render : function() {
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    var deliveryInstance;
    App.contracts.Delivery.deployed().then(function(instance) {
      deliveryInstance = instance;
      return deliveryInstance;
    });
  },

  myFunction : function() {
    var flag = 0;
    if (document.getElementById('customerinp').checked) {
      flag =1;
    }
    if (document.getElementById('restaurantinp').checked) {
      flag =2;
    }
    if (document.getElementById('courierinp').checked)  {
      flag =3;
    }
    // console.log($('#courierinp').val());
    if (flag == 1) {
      console.log("here");
      App.contracts.Delivery.deployed().then(function(instance) {
        return instance.register_customer();
      }).catch(function(err) {
        console.log(err);
      });
    }
    if (flag == 2) {
      console.log("here");
      App.contracts.Delivery.deployed().then(function(instance) {
        return instance.register_restaurant();
      }).catch(function(err) {
        console.log(err);
      });
    }
    if (flag == 3) {
      console.log("here");
      App.contracts.Delivery.deployed().then(function(instance) {
        return instance.register_courier();
      }).catch(function(err) {
        console.log(err);
      });
    }
    /**if (document.getElementById('customerinp').checked){
      document.getElementById('register').style.display = 'block';
      document.getElementById('courier_home').style.display = 'none';
      document.getElementById('restaurant_home').style.display = 'none';
      document.getElementById('customer_home').style.display = 'block';
      console.log("D")
  }
  if (document.getElementById('restaurantinp').checked){
      document.getElementById('register').style.display = 'block';
      document.getElementById('courier_home').style.display = 'none';
      document.getElementById('restaurant_home').style.display = 'block';
      document.getElementById('customer_home').style.display = 'none';
      console.log("D")
  }
  if (document.getElementById('courierinp').checked){
      document.getElementById('register').style.display = 'block';
      document.getElementById('courier_home').style.display = 'block';
      document.getElementById('restaurant_home').style.display = 'none';
      document.getElementById('customer_home').style.display = 'none';
      console.log("D")
  }**/
  },

  placeorder : function(){
    console.log("Order Placed");
    App.contracts.Delivery.deployed().then(function(instance){
      return instance.place_order([1],1,{value: 6});
    }).catch(function(err){
      console.log(err);
    });
  },

  acceptorder : function(){
    console.log("Order Accepted");
    App.contracts.Delivery.deployed().then(function(instance){
      return instance.accept_order(1);
    }).catch(function(err){
      console.log(err);
    });
  },

  acceptdel : function(){
    console.log("Order Accepted By Courier");
    App.contracts.Delivery.deployed().then(function(instance){
      return instance.accept_delivery(1);
    }).catch(function(err){
      console.log(err);
    });
  },

  makefood : function(){
    console.log("Making the Order");
    App.contracts.Delivery.deployed().then(function(instance){
      return instance.make_food(1);
    }).catch(function(err){
      console.log(err);
    });
  },

  collectfromrest : function(){
    console.log("Order Collected from Restaurant");
    App.contracts.Delivery.deployed().then(function(instance){
      return instance.collect_food(1);
    }).catch(function(err){
      console.log(err);
    });
  },

  collectMoneyRest : function(){
    console.log("Restaurant collects Money");
    App.contracts.Delivery.deployed().then(function(instance){
      return instance.collect_food_fee(1);
    }).catch(function(err){
      console.log(err);
    });
  },

  delivertocust : function(){
    console.log("Order Delivered to Customer");
    App.contracts.Delivery.deployed().then(function(instance){
      return instance.deliver_food(1);
    }).catch(function(err){
      console.log(err);
    });
  },

  foodreceived : function(){
    console.log("Food Received By Customer");
    App.contracts.Delivery.deployed().then(function(instance){
      return instance.confirm_food_arrival();
    }).catch(function(err){
      console.log(err);
    });
  },

  collectMoneyCour : function(){
    console.log("Money collected by Courier");
    App.contracts.Delivery.deployed().then(function(instance){
      return instance.collect_delivery_fee(1);
    }).catch(function(err){
      console.log(err);
    });
  },

  ratecourier : function(){
    var flag = 0;
    if (document.getElementById('1').checked) {
      flag =1;
    }
    if (document.getElementById('2').checked) {
      flag =2;
    }
    if (document.getElementById('3').checked)  {
      flag =3;
    }
    if (document.getElementById('4').checked)  {
      flag =4;
    }
    if (document.getElementById('5').checked)  {
      flag =5;
    }
    if(flag == 1)
    {
      console.log("Rating Done");
      App.contracts.Delivery.deployed().then(function(instance){
      return instance.rate_courier(1);
      }).catch(function(err){
      console.log(err);
      });
    }
    if(flag == 2)
    {
      console.log("Rating Done");
      App.contracts.Delivery.deployed().then(function(instance){
      return instance.rate_courier(2);
      }).catch(function(err){
      console.log(err);
      });
    }
    if(flag == 3)
    {
      console.log("Rating Done");
      App.contracts.Delivery.deployed().then(function(instance){
      return instance.rate_courier(3);
      }).catch(function(err){
      console.log(err);
      });
    }
    if(flag == 4)
    {
      console.log("Rating Done");
      App.contracts.Delivery.deployed().then(function(instance){
      return instance.rate_courier(4);
      }).catch(function(err){
      console.log(err);
      });
    }
    if(flag == 5)
    {
      console.log("Rating Done");
      App.contracts.Delivery.deployed().then(function(instance){
      return instance.rate_courier(5);
      }).catch(function(err){
      console.log(err);
      });
    }
  },  

  ratefood : function(){
  var flag = 0;
  if (document.getElementById('A').checked) {
    flag =1;
  }
  if (document.getElementById('B').checked) {
    flag =2;
  }
  if (document.getElementById('C').checked)  {
    flag =3;
  }
  if (document.getElementById('D').checked)  {
    flag =4;
  }
  if (document.getElementById('E').checked)  {
    flag =5;
  }
  if(flag == 1)
  {
    console.log("Rating Done");
    App.contracts.Delivery.deployed().then(function(instance){
    return instance.rate_food(1);
    }).catch(function(err){
    console.log(err);
    });
  }
  if(flag == 2)
  {
    console.log("Rating Done");
    App.contracts.Delivery.deployed().then(function(instance){
    return instance.rate_food(2);
    }).catch(function(err){
    console.log(err);
    });
  }
  if(flag == 3)
  {
    console.log("Rating Done");
    App.contracts.Delivery.deployed().then(function(instance){
    return instance.rate_food(3);
    }).catch(function(err){
    console.log(err);
    });
  }
  if(flag == 4)
  {
    console.log("Rating Done");
    App.contracts.Delivery.deployed().then(function(instance){
    return instance.rate_food(4);
    }).catch(function(err){
    console.log(err);
    });
  }
  if(flag == 5)
  {
    console.log("Rating Done");
    App.contracts.Delivery.deployed().then(function(instance){
    return instance.rate_food(5);
    }).catch(function(err){
    console.log(err);
    });
  }
}, 

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
