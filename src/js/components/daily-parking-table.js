import Component from '../helpers/component';
import SuperAgent from 'superagent';
import Endpoints from '../endpoints';

const ParkingDailyEntries = new Component({
  el: '#entries',
  table_container: '#parking-entries-table',
  table: '#entries-list',
  table_header: '#entries-list thead tr',
  entries_container: null,

  init() {
    this.bindEvents();
  },

  bindEvents() {
    this.fetchEntries();
    this.injectControls();
  },

  sortByExitDesc(data) {
    let items = data ? data : ParkingDailyEntries.entries_container;
    // Sort parking entries in descending order
    items = items.sort((a, b) => {
      return new Date(a.out) - new Date(b.out);
    });

    return items;
  },

  convertSecondsToHours(secondsPassedIn) {
    // Figure out hours, minutes and seconds
    let hours = Math.floor(secondsPassedIn / 3600),
      minutes = Math.floor((secondsPassedIn - (hours * 3600)) / 60);

    // Massage hours
    hours = hours > 0 ? hours + 'hr ' : '';

    // Figure out seconds
    let seconds = secondsPassedIn - (hours * 3600) - (minutes * 60);

    // Round up seconds
    seconds = Math.round(seconds * 100) / 100

    // Create human friendly duration in hours and minutes
    let result = hours;
    result = (result === '00' ? '' : result);
    result += minutes;
    return result + 'min';
  },

  calculatePrice(time) {
    const duration = time,
      hours = Math.floor(time / 3600),
      minutes = Math.floor((time - (hours * 3600)) / 60);

    const minutesPrice = Math.floor(minutes / 60 * 100) * 2.99 / 100,
      hoursPrice = hours * 2.99,
      finalPrice = (hoursPrice + minutesPrice)
      .toFixed(2);

    return duration <= 3600 ? 'FREE' : '$' + finalPrice;
  },

  buildTableRows(data) {
    const items = data;

    // Get our destination element
    let table = document.querySelector(this.el);

    // Create placeholder <tr/> to be deleted after results are injected
    // We do this strictly for performance reasons - use the DOM api is much faster than innerHTML tricks
    const tr = document.createElement('tr');
    table.appendChild(tr);

    // Iterate through list and create item markup
    items.map((item, index) => {
      let time_of_entry = item.in ? item.in : 'Not Recorded',
        time_of_exit = item.out ? item.out : 'Not Recorded',
        license_plate = item.license ? item.license : 'Plate Unknown',
        price = 2.99,
        duration = null,
        classNameHolder = '',
        hourMinimum = null,
        over24Hours = null;

      // Take the primitive date values and convert them
      time_of_entry = new Date(time_of_entry)
        .toLocaleTimeString();

      // Take the primitive date values and convert them
      time_of_exit = new Date(time_of_exit)
        .toLocaleTimeString();


      // Calculate duration time
      duration = Math.floor((new Date(item.out)
        .getTime() - new Date(item.in)
        .getTime()) / 1000);

      // Determine business conditions
      hourMinimum = duration <= 3600 ? ' under-an-hour ' : '';
      over24Hours = duration > 86400 ? ' over-24-hours ' : '';

      // Set classes
      classNameHolder = hourMinimum + over24Hours;

      // Set price
      price = this.calculatePrice(duration);

      // Create our table row markup
      let tableRows =
        `
				<tr
					index='${index}'
					license='${license_plate}'
					duration='${duration}'
          exit-raw-value='${item.out}'
          enter-raw-value='${item.in}'
					time-of-entry='${time_of_entry}'
					time-of-exit='${time_of_exit}'
          class='${classNameHolder}'
				>
				<td>
					${license_plate}
				</td>

				<td>
					${price}
				</td>

				<td>
					${this.convertSecondsToHours(duration)}
				</td>

				<td title='${new Date(item.in).toLocaleDateString()}'>
					${time_of_entry}
				</td>

				<td title='${new Date(item.out).toLocaleDateString()}'>
					${time_of_exit}
				</td>

			</tr>`;

      // Insert the resulting rows
      tr.insertAdjacentHTML('afterend', tableRows)

    });

    table.removeChild(tr);
  },

  fetchEntries() {
    SuperAgent
      .get(Endpoints.parking_entries)
      .end(function(err, res) {
        // Catch errors when they occur
        if (err) {
          return false;
        }

        if (res.status === 200) {
          const data = JSON.parse(res.text);

          // Default sorting by exit time
          const sortEntries = ParkingDailyEntries.sortByExitDesc(data);

          // Store data for reuse
          ParkingDailyEntries.entries_container = sortEntries;

          // Build parking entries table roes
          ParkingDailyEntries.buildTableRows(ParkingDailyEntries.entries_container);
        }

      })
  },

  injectControls() {
    const targetContainer = document.querySelector(this.table_container);

    // Inject toggle for free entries
    this.toggleFree(targetContainer);

  },

  toggleFree(destination) {
    let toggle = document.createElement('div'),
      button = document.createElement('span'),
      text = document.createElement('span'),
      docFragment = document.createDocumentFragment(),
      table = document.querySelector(this.el);

    toggle.className = 'toggle-free-entries-wrapper';
    button.className = 'toggle-free-entries';
    text.className = 'toggle-header';

    text.innerHTML = 'Only 24hr+ Entries';

    toggle.appendChild(text);
    toggle.appendChild(button);

    toggle.onclick = () => {
      const rows = table.querySelectorAll('tr');

      const showTables = () => {
        for (var prop in rows) {
          if (rows.hasOwnProperty(prop)) {
            if (rows[prop].classList.contains('over-24-hours') !== true) {
              rows[prop].classList.remove('hide');
            }
          }
        }
      }

      const hideTables = () => {
        for (var prop in rows) {
          if (rows.hasOwnProperty(prop)) {
            if (rows[prop].classList.contains('over-24-hours') !== true) {
              rows[prop].classList.add('hide');
            }
          }
        }
      }

      toggle.classList.contains('active') === true ? showTables() : hideTables();
      toggle.classList.toggle('active');
    }

    docFragment.appendChild(toggle);
    destination.prepend(docFragment);
  },

  toggle24hrs() {

  },

});

export default ParkingDailyEntries;
