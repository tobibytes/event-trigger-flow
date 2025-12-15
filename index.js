const emitButton = document.getElementById('emit-button');
const emitOptions = [...document.querySelectorAll('.emit-option')];
const deliveryLog = document.getElementById('delivery-log');
const emitSummary = document.querySelector('[data-summary="emit-count"]');
const services = [...document.querySelectorAll('.service')].map((service) => ({
    name: service.dataset.serviceName,
    checkboxes: [...service.querySelectorAll('.subscription-checkbox')],
    summary: service.querySelector('.summary-count'),
    output: service.querySelector('.service-output'),
}));

const labelByValue = Object.fromEntries(
    emitOptions.map((input) => [input.value, input.nextElementSibling?.textContent || input.value])
);

const checkedValues = (inputs) => inputs.filter((input) => input.checked).map((input) => input.value);
const summaryText = (inputs) => {
    const count = checkedValues(inputs).length;
    return count === 0 ? 'None selected' : `${count}/${inputs.length} selected`;
};

const syncSummaries = () => {
    emitSummary.textContent = summaryText(emitOptions);
    services.forEach(({ checkboxes, summary }) => {
        if (summary) summary.textContent = summaryText(checkboxes);
    });
};

const addLogEntry = (text) => {
    const item = document.createElement('li');
    item.textContent = text;
    deliveryLog.prepend(item);
    const placeholder = deliveryLog.querySelector('.muted');
    if (placeholder) placeholder.remove();
    if (deliveryLog.children.length > 20) deliveryLog.removeChild(deliveryLog.lastChild);
};

const formatEvents = (events) => events.map((e) => labelByValue[e] || e).join(', ');

[...emitOptions, ...services.flatMap((s) => s.checkboxes)].forEach((input) =>
    input.addEventListener('change', syncSummaries)
);

syncSummaries();

emitButton.addEventListener('click', () => {
    const eventsToEmit = checkedValues(emitOptions);

    if (!eventsToEmit.length) {
        addLogEntry('No events selected to emit.');
        services.forEach(({ output }) => {
            output.textContent = 'No events emitted.';
            output.classList.add('muted');
        });
        return;
    }

    services.forEach(({ name, checkboxes, output }) => {
        const heard = eventsToEmit.filter((event) => checkedValues(checkboxes).includes(event));
        if (heard.length) {
            const message = `${name} heard: ${formatEvents(heard)}`;
            output.textContent = message;
            output.classList.remove('muted');
            addLogEntry(message);
        } else {
            output.textContent = 'No matching events this time.';
            output.classList.add('muted');
        }
    });
});
