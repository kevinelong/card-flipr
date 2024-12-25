const Div = (kind, content) => {
    const e = document.createElement("div");
    e.setAttribute("class", kind);
    e.innerHTML = content || "";
    return e;
};

const Card = c => {
    const e = Div("card");
    e.appendChild(Div("title", c.q));
    e.appendChild(Div("desc off", c.a));
    const b = Div("btn", "...");
    b.addEventListener("click", e=>{
        const d = e.target.parentElement.querySelector(".desc");
        d.classList.remove("off")
        d.classList.add("on")
    })
    e.appendChild(b);
    return e;
};

const Deck = d => {
    const e = Div("deck", d.name);
    d.cards.forEach(c=>e.appendChild(Card(c)));
    return e;
};

function lineToCard(o) {
    // o.q = `${o.topic} - <b>${o.name}</b>`;
    o.q = o.name;
    o.a = `<b>${o.meaning}</b><hr>e.g.<br>${o.example}`;
    return o;
}

document.addEventListener("DOMContentLoaded", async () => {
    raw = await fetch("output.json");
    data = await raw.json();
    lastTopic = "";
    let q;
            
    data.forEach(o => {
        if (o.topic != lastTopic) {
            q = { name: o.topic, cards: [] };
            window.app_data.users[0].decks.push(q);
            lastTopic = o.topic;
        }
        q.cards.push(lineToCard(o));
    });
    window.app_data.users[0].decks.push(q);

    window.app_data.users[0].decks.push(q);
    app_data.users[0].decks.forEach(d=> app.appendChild(Deck(d)));
});