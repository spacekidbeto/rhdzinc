// DRYing up the code is the next step

function pad(n) {
  n = String(n)
  return n.length < 2 ? '0' + n : n
}

var hourFormat = false

var interval = setInterval(function() {
  var date = new Date()

  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()

  var ampm
  var time

  if (hourFormat) {
    ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours > 12 ? hours - 12 : hours
    time = hours + ':' + pad(minutes) + ':' + pad(seconds)
    $('.time').html(time + '<span class="ampm">'+ampm+'</span>')
  } else {
    time = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    $('.time').html(time)
  }

  $('.date').html(date.toDateString())
})

incrementMinutes = false
