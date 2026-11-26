/**
 * NULSCC Live Countdown Module
 * Reusable across /adventures/nulscc/ and future homepage takeover banners.
 * Markup contract:
 *   <div data-nulscc-countdown data-target-date="2027-03-13T09:00:00Z">
 *     <span data-unit="days">--</span>
 *     <span data-unit="hours">--</span>
 *     <span data-unit="minutes">--</span>
 *     <span data-unit="seconds">--</span>
 *   </div>
 */
(function () {
    'use strict';

    function pad(value) {
        return String(Math.max(0, Math.floor(value))).padStart(2, '0');
    }

    function initCountdown(container) {
        var targetIso = container.getAttribute('data-target-date');
        if (!targetIso) return;

        var targetMs = Date.parse(targetIso);
        if (Number.isNaN(targetMs)) return;

        var daysEl = container.querySelector('[data-unit="days"]');
        var hoursEl = container.querySelector('[data-unit="hours"]');
        var minutesEl = container.querySelector('[data-unit="minutes"]');
        var secondsEl = container.querySelector('[data-unit="seconds"]');
        var liveMessage = container.getAttribute('data-live-message') || 'NULSCC is live today!';

        function update() {
            var diff = targetMs - Date.now();

            if (diff <= 0) {
                container.innerHTML = '<p class="nulscc-countdown-status">' + liveMessage + '</p>';
                return false;
            }

            var totalSeconds = Math.floor(diff / 1000);
            var days = Math.floor(totalSeconds / 86400);
            var hours = Math.floor((totalSeconds % 86400) / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = totalSeconds % 60;

            if (daysEl) daysEl.textContent = String(days);
            if (hoursEl) hoursEl.textContent = pad(hours);
            if (minutesEl) minutesEl.textContent = pad(minutes);
            if (secondsEl) secondsEl.textContent = pad(seconds);
            return true;
        }

        if (update()) {
            var timerId = window.setInterval(function () {
                if (!update()) {
                    window.clearInterval(timerId);
                }
            }, 1000);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var countdowns = document.querySelectorAll('[data-nulscc-countdown]');
        countdowns.forEach(initCountdown);
    });
})();
