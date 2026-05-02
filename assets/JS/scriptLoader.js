var msgs = [
    "Awaiting your location\u2026",
    "Finding prayer times\u2026",
    "Calculating Qibla\u2026",
    "Almost ready\u2026",
    "Welcome \u2014 your Khalil is here"
  ];
  var i = 0;
  var el = document.getElementById('statusTxt');

  function next() {
    if (i >= msgs.length) return;
    el.style.opacity = '0';
    setTimeout(function() {
      el.textContent = msgs[i++];
      el.style.opacity = '1';
    }, 450);
  }

  next();
  var iv = setInterval(function() {
    next();
    if (i >= msgs.length) clearInterval(iv);
  }, 920);