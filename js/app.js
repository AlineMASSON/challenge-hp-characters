const app = {
  state: {
    currentType: 'Student',
    currentHouse: 'Ravenclaw',
    houses: [
      'Gryffindor',
      'Hufflepuff',
      'Ravenclaw',
      'Slytherin',
    ],
    types: [
      'Student',
      'Teacher',
    ],
    characters: [{
      'name': 'Harry Potter',
      'house': 'Gryffindor',
      'image': 'http://hp-api.herokuapp.com/images/harry.jpg',
      'type': 'Student'
    },
    {
      'name': 'Hermione Granger',
      'house': 'Gryffindor',
      'image': 'http://hp-api.herokuapp.com/images/hermione.jpeg',
      'type': 'Student'
    },
    {
      'name': 'Ron Weasley',
      'house': 'Gryffindor',
      'image': 'http://hp-api.herokuapp.com/images/ron.jpg',
      'type': 'Student'
    },
    {
      'name': 'Draco Malfoy',
      'house': 'Slytherin',
      'image': 'http://hp-api.herokuapp.com/images/draco.jpg',
      'type': 'Student'
    },
    {
      'name': 'Minerva McGonagall',
      'house': 'Gryffindor',
      'image': 'http://hp-api.herokuapp.com/images/mcgonagall.jpg',
      'type': 'Teacher'
    },
    {
      'name': 'Cedric Diggory',
      'house': 'Hufflepuff',
      'image': 'http://hp-api.herokuapp.com/images/cedric.png',
      'type': 'Student'
    },
    {
      'name': 'Cho Chang',
      'house': 'Ravenclaw',
      'image': 'http://hp-api.herokuapp.com/images/cho.jpg',
      'type': 'Student'
    },
    {
      'name': 'Severus Snape',
      'house': 'Slytherin',
      'image': 'http://hp-api.herokuapp.com/images/snape.jpg',
      'type': 'Teacher'
    },
    {
      'name': 'Luna Lovegood',
      'house': 'Ravenclaw',
      'image': 'http://hp-api.herokuapp.com/images/luna.jpg',
      'type': 'Student'
    }
    ],
  },

  init: function() {
    
    console.log('Wingardium Leviosa ! ✨'); 
    
    app.filteredCharacters = app.state.characters.filter((character) => {
      return (
        character.house === app.state.currentHouse &&
        character.type === app.state.currentType
      );
    });
    
    app.containerElement = document.querySelector('#app');
    
    app.createHeader();
    
    app.mainElem =  app.configureElement('main', app.containerElement);

    app.createForm();
    app.createList();
  },

  /**
   * Create, configure and insert the app's header
   */
  createHeader: function() {
    
    const headerElement = app.configureElement('header', app.containerElement);
    app.configureElement('h1', headerElement, {
      textContent: 'Les personnages d\'Harry Potter',
    });
  },

  /**
   * Create, configure and insert the app's form
   */
  createForm: function() {
    
    const formElem = app.configureElement('form', app.mainElem, {
      className: 'selections'
    });
    
    const selectTypesElem = app.configureElement('select', formElem, {
      name: 'type',
      id: 'type'
    });

    selectTypesElem.addEventListener('change', app.handleTypeChange);
    
    app.state.types.forEach((type) => {
      app.configureElement('option', selectTypesElem, {
        value: type,
        textContent: type,
        selected: type === app.state.currentType
      });
    });
    
    const selectHousesElem = app.configureElement('select', formElem, {
      name: 'house',
      id: 'house'
    });

    selectHousesElem.addEventListener('change', app.handleHouseChange);

    app.state.houses.forEach((house) => {
      app.configureElement('option', selectHousesElem, {
        value: house,
        textContent: house,
        selected: house === app.state.currentHouse
      });
    });
  },

  /**
   * Create, configure and insert the app's characters list
   */
  createList: function() {
    const listElement = app.configureElement('section', app.mainElem, {
      className: 'characters',
    });
    
    app.filteredCharacters.forEach((character) => {
      
      const articleElement = app.configureElement('article', listElement, {
        className: 'character',
      });
      
      app.configureElement('img', articleElement, {
        src: character.image,
      });

      const divElement = app.configureElement('div', articleElement, {
        className: 'character__infos',
      });
      
      app.configureElement('h2', divElement, {
        textContent: character.name,
        className: 'name',
      });
      
      app.configureElement('h3', divElement, {
        textContent: character.house,
        className: 'house',
      });
      
      app.configureElement('h4', divElement, {
        textContent: character.type,
        className: 'type',
      });
    });
  },

  /**
   * create, configure and insert a new element
   * @param {string} tag - the name of the tag
   * @param {Element} parent - the parent element
   * @param {Object} attributes - the attributes to add to the child
   * @returns the new child element
   */
  configureElement: function(tag, parent, attributes) {
    const element = document.createElement(tag);
    for (const key in attributes) {
      element[key] = attributes[key];
    }
    parent.appendChild(element);
    return element;
  },

  /**
   * Types select change Handler 
   * @param {Object} evt - the event's object
   */
  handleTypeChange: function(evt) {
    const typeValue = evt.target.value;
    
    app.state.currentType = typeValue;
    console.log(app.state.currentType, typeValue);

    app.containerElement.innerHTML = '';
    app.init();
  },

  /**
   * Houses select change Handler 
   * @param {Object} evt - the event's object
   */
  handleHouseChange: function(evt) {
    const houseValue = evt.target.value;

    app.state.currentHouse = houseValue;
    console.log(app.state.currentHouse, houseValue);
    
    app.containerElement.innerHTML = '';
    app.init();
  }
};

document.addEventListener('DOMContentLoaded', app.init);