function getAllDaysInMonth(month, year) {
  var date = new Date(year, month, 1)
  var days = []
  while (date.getMonth() == month) {
    days.push(date.getDate())
    date.setDate(date.getDate() + 1)
  }
  return days
}

function changeYear() {
  var container = this.parentNode.parentNode
  var year = parseInt(container.querySelector('.title').innerHTML) - 1
  if (this.className == 'next') {
    year += 2
  }
  container.innerHTML = ''
  container.appendChild(createCalendar(year))
}

function createCalendar(year) {
  var months = [...new Array(12).keys()]
  var yearElement = document.createElement('time')
  yearElement.setAttribute('datetime', year)
  yearElement.className = 'year'
  yearElement.innerHTML = '<header><button class="prev"><</button><span class="title">' + year + '</span><button class="next">></button></header>'

  for (btn of yearElement.querySelectorAll('.prev, .next')) {
    btn.onclick = changeYear
  }

  for (m of months) {
    var monthElement = document.createElement('time')
    var days = getAllDaysInMonth(m, year)
    var twoDigitsMonth = (m < 9) ? '0' + (m+1) : (m+1)

    monthElement.setAttribute('datetime', year + '-' + twoDigitsMonth)
    monthElement.className = 'month'

    for (d of days) {
      var twoDigitsDay = (d < 10) ? '0' + d : d
      var dayElement = document.createElement('time')
      dayElement.setAttribute('datetime', [year, twoDigitsMonth, twoDigitsDay])
      if ([0,6].indexOf(new Date(year,m,d).getDay()) !== -1) {
        dayElement.className = 'weekend'
      }
      dayElement.innerHTML = d
      monthElement.appendChild(dayElement)
    }

    yearElement.appendChild(monthElement)
  }
  return yearElement
}

document.querySelector('.container').appendChild(createCalendar(2017))
