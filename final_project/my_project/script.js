function savePlot() {
  const title = document.getElementById("title").value;
  const characters = document.getElementById("characters").value;
  const setting = document.getElementById("setting").value;
  const body = document.getElementById("body").value;
  const tags = document.getElementById("tags").value;
  const completed = document.getElementById("completed").checked;

  const plot = {
    title,
    characters,
    setting,
    body,
    tags,
    completed
  };

  localStorage.setItem(`plot_${title}`, JSON.stringify(plot));
  displaySavedPlots();
}

function displaySavedPlots() {
  const savedPlots = document.getElementById("savedPlots");
  const searchQuery = document.getElementById("search").value.toLowerCase();
  savedPlots.innerHTML = "";

  for (let key in localStorage) {
    if (key.startsWith("plot_")) {
      const plot = JSON.parse(localStorage.getItem(key));
      const textContent = `${plot.title} ${plot.characters} ${plot.tags}`.toLowerCase();
      if (!textContent.includes(searchQuery)) continue;

      const div = document.createElement("div");
      div.className = "plot-entry";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = plot.completed;
      checkbox.disabled = true;

      const editBtn = document.createElement("button");
      editBtn.textContent = "編集";
      editBtn.onclick = () => loadPlot(plot);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "削除";
      deleteBtn.onclick = () => deletePlot(plot.title);

      div.innerHTML = `<strong>${plot.title}</strong><br>
        キャラクター: ${plot.characters}<br>
        設定: ${plot.setting}<br>
        本文: ${plot.body}<br>
        タグ: ${plot.tags}<br>`;
      div.appendChild(document.createTextNode(" 完成済み: "));
      div.appendChild(checkbox);
      div.appendChild(editBtn);
      div.appendChild(deleteBtn);

      savedPlots.appendChild(div);
    }
  }
}

function loadPlot(plot) {
  document.getElementById("title").value = plot.title;
  document.getElementById("characters").value = plot.characters;
  document.getElementById("setting").value = plot.setting;
  document.getElementById("body").value = plot.body;
  document.getElementById("tags").value = plot.tags || "";
  document.getElementById("completed").checked = plot.completed;
}

function deletePlot(title) {
  if (confirm(`"${title}" を削除しますか？`)) {
    localStorage.removeItem(`plot_${title}`);
    displaySavedPlots();
  }
}

document.addEventListener("DOMContentLoaded", displaySavedPlots);
