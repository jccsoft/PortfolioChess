(function (app) {
  ('use strict');

  let siteData = {};

  app.homepageSetup = async function () {
    setCopyrightDate();
    await populateData();
    wireContactForm();
  };

  app.portfolioSetup = async function () {
    setCopyrightDate();
    await populateData();
    setNavigation();
    setSampleItems();
  };

  app.workItemSetup = async function () {
    setCopyrightDate();
    await populateData();
    setNavigation();
    setWorkItemInfo();
  };

  function setCopyrightDate() {
    document.getElementById('copyright-year').innerText = new Date().getFullYear();
  }

  function wireContactForm() {
    const contact = document.getElementById('contact-section');
    const a = contact.querySelector('a');
    a.addEventListener('click', toggleFormVisible);
    const form = contact.querySelector('form');
    document.getElementById('contact-form');
    form.onsubmit = formSubmit;
  }

  function toggleFormVisible(e) {
    e.preventDefault();
    const form = document.getElementById('contact-form');

    if (form.style.display == 'block') {
      form.style.display = 'none';
    } else {
      form.style.display = 'block';
    }
  }
  function formSubmit(e) {
    e.preventDefault();

    const form = document.getElementById('contact-form');
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const message = form.querySelector('#message').value;
    const lb = '%0D%0A';
    const emailString = `mailto:${siteData.email}?subject=Contacto web de ${name}&body=Nombre: ${name}${lb}Email: ${email}${lb}Mensaje: ${message}${lb}`;
    window.open(emailString);
  }

  function setNavigation() {
    const fragment = new DocumentFragment();

    for (let index = 0; index < siteData.workItems.length; index++) {
      const workItem = siteData.workItems[index];
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `workitem.html?item=${index + 1}`;
      a.innerText = workItem.title;
      li.appendChild(a);
      fragment.appendChild(li);
    }

    document.querySelector('nav ul').appendChild(fragment);
  }

  function setSampleItems() {
    const fragment = new DocumentFragment();

    for (let index = 0; index < siteData.workItems.length; index++) {
      const workItem = siteData.workItems[index];
      const div1 = document.createElement('div');
      div1.classList.add('highlight');
      if (index % 2 !== 0) div1.classList.add('invert');
      const div2 = document.createElement('div');
      const h2 = document.createElement('h2');
      const titleArray = workItem.title.split(' ');
      let title = '';
      titleArray.forEach((word) => {
        if (title.length > 0) title += '<br />';
        title += word;
      });
      h2.innerHTML = title;
      const a = document.createElement('a');
      a.href = `workitem.html?item=${index + 1}`;
      a.innerText = 'ver más';
      const picture = document.createElement('picture');
      const source = document.createElement('source');
      source.srcset = `img/${workItem.imgFile}.webp`;
      source.alt = `${workItem.title}`;
      const img = document.createElement('img');
      img.src = `img/old/${workItem.imgFile}.png`;
      img.alt = `${workItem.title}`;
      picture.appendChild(source);
      picture.appendChild(img);
      div2.appendChild(h2);
      div2.appendChild(a);
      div1.appendChild(div2);
      div1.appendChild(picture);
      fragment.appendChild(div1);
    }

    document.querySelector('main').appendChild(fragment);
  }

  function setWorkItemInfo() {
    const itemNumber = readItemNumber();
    if (itemNumber === 0) {
      showErrorNotFound();
      return;
    }

    document.querySelector('h2').innerText = siteData.workItems[itemNumber - 1].title;

    document.querySelector('source').srcset = `img/${siteData.workItems[itemNumber - 1].imgFileFull}.webp`;
    document.querySelector('img').src = `img/${siteData.workItems[itemNumber - 1].imgFileFull}.jpg`;

    document.querySelector('#project-text p').innerText = siteData.workItems[itemNumber - 1].project;

    const fragment = new DocumentFragment();
    for (let index = 0; index < siteData.workItems[itemNumber - 1].technologies.length; index++) {
      const li = document.createElement('li');
      li.innerText = siteData.workItems[itemNumber - 1].technologies[index];
      fragment.appendChild(li);
    }
    document.querySelector('#technology-text ul').appendChild(fragment);

    document.querySelector('#challenges-text p').innerText = siteData.workItems[itemNumber - 1].challenges;
  }

  function readItemNumber() {
    let itemNumber = 0;
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('item')) {
      const itemParam = parseInt(searchParams.get('item'));
      if (isNaN(itemParam) == false && itemParam > 0 && itemParam <= siteData.workItems.length) {
        itemNumber = itemParam;
      }
    }
    return itemNumber;
  }

  function showErrorNotFound() {
    document.querySelector('main').innerHTML = '<h3>Oops. Page not Found</h3>';
  }

  async function populateData() {
    const cachedData = sessionStorage.getItem('portfolioData');
    if (cachedData !== null) {
      siteData = JSON.parse(cachedData);
    } else {
      siteData = await fetch('./sitedata.json').then((response) => response.json());
      sessionStorage.setItem('portfolioData', JSON.stringify(siteData));
    }
  }
})((window.app = window.app || {}));
