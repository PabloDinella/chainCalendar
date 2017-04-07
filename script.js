function getAllDaysInMonth(month, year) {
  var date = new Date(year, month, 1)
  var days = []
  while (date.getMonth() == month) {
    days.push(date.getDate())
    date.setDate(date.getDate() + 1)
  }
  return days
}

function toTwoDigits(number) {
  return (number < 10) ? '0' + (number) : number
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

function createDayElement(y, m, d) {
  var dayElement = document.createElement('time')
  dayElement.setAttribute('datetime', [y, toTwoDigits(m+1), toTwoDigits(d)])
  if ([0,6].indexOf(new Date(y,m,d).getDay()) !== -1) {
    dayElement.className = 'weekend'
  }
  dayElement.innerHTML = d
  return dayElement
}

function createMonthElement(y, m) {
  var monthElement = document.createElement('time')
  var days = getAllDaysInMonth(m, y)
  for (d of days) {
    monthElement.appendChild(createDayElement(y, m, d))
  }
  monthElement.setAttribute('datetime', y + '-' + toTwoDigits(m+1))
  monthElement.className = 'month'
  return monthElement
}

function createYearElement(y) {
  var yearElement = document.createElement('time')
  yearElement.setAttribute('datetime', y)
  yearElement.className = 'year'
  yearElement.innerHTML = '<header><button class="prev"><</button><span class="title">' + y + '</span><button class="next">></button></header>'

  for (btn of yearElement.querySelectorAll('.prev, .next')) {
    btn.onclick = changeYear
  }

  var months = [...new Array(12).keys()]
  for (m of months) {
    yearElement.appendChild(createMonthElement(y, m))
  }
  return yearElement
}

function createCalendar(selector) {
  var year = new Date().getFullYear()
  var el = document.querySelector(selector)
  if (!el) {
    return;
  }
  el.appendChild(createYearElement(year))
  return true;
}

createCalendar('.calendar')
