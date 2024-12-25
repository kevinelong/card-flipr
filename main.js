const escapeHTML = str => str.replace(/[&<>'"]/g, 
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag]));
      
const Div = (kind) => {
    const e = document.createElement("div");
    e.setAttribute("class", kind);
    return e;
};

const Card = c => {
    const e = Div("card");
    const q = Div("title");
    q.innerHTML = c.q
    e.appendChild(q);
    const d = Div("desc off");
    const p = document.createElement("div");
    p.innerHTML = c.a || "";
    d.appendChild(p);
    e.appendChild(d);
    const b = Div("btn");
    b.innerText = "...";
    b.addEventListener("click", e=>{
        const d = e.target.parentElement.querySelector(".desc");
        d.classList.remove("off")
        d.classList.add("on")
    })
    e.appendChild(b);
    return e;
};

const Deck = d => {
    const e = Div("deck");
    e.appendChild(Div("title", d.name));
    d.cards.forEach(c=>e.appendChild(Card(c)));
    return e;
};

function lineToCard(o) {
    // o.q = `${o.topic} - <b>${o.name}</b>`;
    o.q = o.name;
    o.a = `<b>${o.meaning}</b><hr>e.g.<br>${escapeHTML(o.example)}`;
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