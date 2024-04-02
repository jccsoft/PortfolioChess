"use strict";

(function (app) {
  'use strict';

  var siteData = {};

  app.homepageSetup = function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setCopyrightDate();
            _context.next = 3;
            return regeneratorRuntime.awrap(populateData());

          case 3:
            wireContactForm();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  app.portfolioSetup = function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            setCopyrightDate();
            _context2.next = 3;
            return regeneratorRuntime.awrap(populateData());

          case 3:
            setNavigation();
            setSampleItems();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  app.workItemSetup = function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            setCopyrightDate();
            _context3.next = 3;
            return regeneratorRuntime.awrap(populateData());

          case 3:
            setNavigation();
            setWorkItemInfo();

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  };

  function setCopyrightDate() {
    document.getElementById('copyright-year').innerText = new Date().getFullYear();
  }

  function wireContactForm() {
    var contact = document.getElementById('contact-section');
    var a = contact.querySelector('a');
    a.addEventListener('click', toggleFormVisible);
    var form = contact.querySelector('form');
    document.getElementById('contact-form');
    form.onsubmit = formSubmit;
  }

  function toggleFormVisible(e) {
    e.preventDefault();
    var form = document.getElementById('contact-form');

    if (form.style.display == 'block') {
      form.style.display = 'none';
    } else {
      form.style.display = 'block';
    }
  }

  function formSubmit(e) {
    e.preventDefault();
    var form = document.getElementById('contact-form');
    var name = form.querySelector('#name').value;
    var email = form.querySelector('#email').value;
    var message = form.querySelector('#message').value;
    var lb = '%0D%0A';
    var emailString = "mailto:".concat(siteData.email, "?subject=Web Contact from ").concat(name, "&body=Name: ").concat(name).concat(lb, "Email: ").concat(email).concat(lb, "Message: ").concat(message).concat(lb);
    window.open(emailString);
  }

  function setNavigation() {
    var fragment = new DocumentFragment();

    for (var index = 0; index < siteData.workItems.length; index++) {
      var workItem = siteData.workItems[index];
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = "workitem.html?item=".concat(index + 1);
      a.innerText = workItem.menuTitle;
      li.appendChild(a);
      fragment.appendChild(li);
    }

    document.querySelector('nav ul').appendChild(fragment);
  }

  function setSampleItems() {
    var fragment = new DocumentFragment();

    var _loop = function _loop(index) {
      var workItem = siteData.workItems[index];
      var div1 = document.createElement('div');
      div1.classList.add('highlight');
      if (index % 2 !== 0) div1.classList.add('invert');
      var div2 = document.createElement('div');
      var h2 = document.createElement('h2'); // h2.innerText = workItem.menuTitle;

      var titleArray = workItem.menuTitle.split(' ');
      var title = '';
      titleArray.forEach(function (word) {
        if (title.length > 0) title += '<br />';
        title += word;
      });
      h2.innerHTML = title;
      var a = document.createElement('a');
      a.href = "workitem.html?item=".concat(index + 1);
      a.innerText = 'see more';
      var picture = document.createElement('picture');
      var source = document.createElement('source');
      source.srcset = "img/".concat(workItem.imgFile, ".webp");
      source.alt = "".concat(workItem.menuTitle);
      var img = document.createElement('img');
      img.src = "img/old/".concat(workItem.imgFile, ".png");
      img.alt = "".concat(workItem.menuTitle);
      picture.appendChild(source);
      picture.appendChild(img);
      div2.appendChild(h2);
      div2.appendChild(a);
      div1.appendChild(div2);
      div1.appendChild(picture);
      fragment.appendChild(div1);
    };

    for (var index = 0; index < siteData.workItems.length; index++) {
      _loop(index);
    }

    document.querySelector('main').appendChild(fragment);
  }

  function setWorkItemInfo() {
    var itemNumber = readItemNumber();

    if (itemNumber === 0) {
      showErrorNotFound();
      return;
    }

    document.querySelector('h2').innerText = siteData.workItems[itemNumber - 1].menuTitle;
    document.querySelector('source').srcset = "img/".concat(siteData.workItems[itemNumber - 1].imgFileFull, ".webp");
    document.querySelector('img').src = "img/".concat(siteData.workItems[itemNumber - 1].imgFileFull, ".jpg");
    document.querySelector('#project-text p').innerText = siteData.workItems[itemNumber - 1].project;
    var fragment = new DocumentFragment();

    for (var index = 0; index < siteData.workItems[itemNumber - 1].technologies.length; index++) {
      // const tech = data.workItems[itemNumber - 1].technologies[index];
      var li = document.createElement('li');
      li.innerText = siteData.workItems[itemNumber - 1].technologies[index];
      fragment.appendChild(li);
    }

    document.querySelector('#technology-text ul').appendChild(fragment);
    document.querySelector('#challenges-text p').innerText = siteData.workItems[itemNumber - 1].challenges;
  }

  function readItemNumber() {
    var itemNumber = 0;
    var searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('item')) {
      var itemParam = parseInt(searchParams.get('item'));

      if (isNaN(itemParam) == false && itemParam > 0 && itemParam <= siteData.workItems.length) {
        itemNumber = itemParam;
      }
    }

    return itemNumber;
  }

  function showErrorNotFound() {
    document.querySelector('main').innerHTML = '<h3>Oops. Page not Found</h3>';
  }

  function populateData() {
    var cachedData;
    return regeneratorRuntime.async(function populateData$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cachedData = sessionStorage.getItem('portfolioData');

            if (!(cachedData !== null)) {
              _context4.next = 5;
              break;
            }

            siteData = JSON.parse(cachedData);
            _context4.next = 9;
            break;

          case 5:
            _context4.next = 7;
            return regeneratorRuntime.awrap(fetch('./sitedata.json').then(function (response) {
              return response.json();
            }));

          case 7:
            siteData = _context4.sent;
            sessionStorage.setItem('portfolioData', JSON.stringify(siteData));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
})(window.app = window.app || {});