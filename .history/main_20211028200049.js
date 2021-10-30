"use strict";

var COLOR_LIST = ['#31fe4d', '#ff00ff', 'orange', '#007fff', '#00ffff'];
var $targetList;

var init = function init() {
  $targetList = document.querySelectorAll('[data-js="reveal"]');
  setup();
  window.addEventListener('scroll', onScroll, false);
  window.dispatchEvent(new Event('scroll'));
};

var getArrayRandomValue = function getArrayRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var setup = function setup() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = $targetList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var $target = _step.value;
      var content = $target.innerHTML;
      var color = 'revealColor' in $target.dataset ? $target.dataset.revealColor : getArrayRandomValue(COLOR_LIST);
      $target.innerHTML = "<span data-reveal=\"content\"><div data-reveal=\"cover\" style=\"background-color:".concat(color, "\"></div><span data-reveal=\"text\">").concat(content, "</span></span>");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var onScroll = function onScroll() {
  var windowH = window.innerHeight;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var isMostScroll = document.body.clientHeight <= scrollTop + windowH;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = $targetList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var $target = _step2.value;
      if ($target.classList.contains('loaded')) continue;
      var rect = $target.getBoundingClientRect();
      var top = rect.top + scrollTop;
      if (isMostScroll || top <= scrollTop + windowH * .8) $target.classList.add('loaded');
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', init, false);    
const sendEmail = async () => {
  var templateParams = {
      name: document.getElementById("name").value,
      message:document.getElementById("message").value,
      city:document.getElementById("city").value,
      Email:document.getElementById("email").value
  };

  emailjs.send('service_v5j0w57', 'template_jckj8km',templateParams)
    .then(function(res)
        {
          console.log("success",res.status);
        })

  const res = await fetch("https://tea-baggins-default-rtdb.firebaseio.com/form.json",{
      method: "POST",
      headers: {
          "Content-Type" : "application/json",
      },
      body:JSON.stringify(templateParams),
     })

  console.log("submited");
  alert("Thank you for your response");
}

