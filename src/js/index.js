// function component() {
//   var element = document.createElement('div');

//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = 'Hello webpack123';

//   return element;
// }

// document.body.appendChild(component());

(function($, toastr){
  window.backBrowserTop = function(){
    window.scrollTo(0, 0);
  }

  window.clickAboutBtn = function(){
    const aboutMeContentEl = document.getElementsByClassName('about-me-content')[0];

    if (aboutMeContentEl.classList.value.indexOf('hide') > -1 ) {
      aboutMeContentEl.classList.remove('hide');
    } else {
      aboutMeContentEl.classList.add('hide');
    }
  }

  if (document.getElementById('apply-trial')) {
    // Setting Notification
    toastr.options.closeButton = true;
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    // Notification for apply_trial.png
    toastr.warning('表單載入中…', '表單資訊');

    if (document.getElementById('apply-trial').attachEvent){
      document.getElementById('apply-trial').attachEvent("onload", function(){
        toastr.clear();
        toastr.success('表單讀取成功…', '表單資訊');
      });
    } else {
      document.getElementById('apply-trial').onload = function(){
        toastr.clear();
        toastr.success('表單讀取成功…', '表單資訊');
      };
    }
  }

})(jQuery, toastr);
