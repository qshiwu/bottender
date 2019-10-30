module.exports = async function App(context) {
  console.log(context.event.message.nlp.entities);
  const { datetime } = context.event.message.nlp.entities;

  if (!datetime) {
    await context.sendText('Not a date or time');
    return;
  }

  const dt = datetime[0];

  if (dt.type === 'value') {
    await context.sendText(`Did you mean ${dt.value} ? :)`);
  } else if (dt.type === 'interval') {
    const { from, to } = dt;
    await context.sendText(
      `Did you mean from ${from.value} to ${to.value} ? :)`
    );
  }
};
