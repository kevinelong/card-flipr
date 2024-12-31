const safe = s => s.replace(/[^a-zA-Z0-9]/g, '');
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
    const e = Div("card " + safe(c.topic));
    const q = Div("title " + safe(c.topic));
    q.innerHTML = c.q;
    e.appendChild(q);
    const d = Div("desc off");
    const p = document.createElement("div");
    p.innerHTML = c.a || "";
    d.appendChild(p);
    e.appendChild(d);
    const b = Div("btn");
    b.innerText = "Touch";

    b.addEventListener("click", e => {
        const d = e.target.parentElement.querySelector(".desc");
        d.classList.remove("off")
        d.classList.add("on")
    })
    
    e.appendChild(b);
    return e;
};


const Deck = d => {
    const e = Div("deck");
    const t = Div("title " + safe(d.cards[0].topic));
    t.innerText = d.name;
    e.appendChild(t);
    d.cards.forEach(c => e.appendChild(Card(c)));
    return e;
};


function lineToCard(o) {
    o.q = o.name;
    o.a = `<b>${o.meaning}</b><br><br>e.g.<br>${escapeHTML(o.example)}`;
    return o;
}


document.addEventListener("DOMContentLoaded", async () => {

    raw = await fetch("output.json");
    data = await raw.json();
    lastTopic = "";
    let q;

    const select = document.createElement("select");
    select.appendChild(new Option("Select a Topic.", ""));

    data.forEach(o => {
        if (o.topic != lastTopic) {
            select.appendChild(new Option(o.topic))
            q = { name: o.topic, cards: [] };
            window.app_data.users[0].decks.push(q);
            lastTopic = o.topic;
        }
        q.cards.push(lineToCard(o));
    });

    select.addEventListener("click", () => document.querySelectorAll(".card, .title").forEach(e => {
        if (select.value) {
            e.style.display = e.classList.contains(safe(select.value)) ? "block" : "none";
        } else {
            e.style.display = "block";
        }
    }))

    app.appendChild(select);

    window.app_data.users[0].decks.push(q);
    app_data.users[0].decks.forEach(d => app.appendChild(Deck(d)));
});