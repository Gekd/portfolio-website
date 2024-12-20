function clearContent() {
    document.getElementById("selected").innerHTML = "";
}

function loadContent(fileName, id) {

    console.log(`Loading ${fileName}`);
    const file = `pages/${fileName}.html`;

    const contentDiv = document.getElementById("selected");
    fetch(`data/${fileName}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load data/${fileName}.json`);
            }
            return response.json();
        })
        .then(data => {
            if (fileName == "projects") {
                clearContent();
                var list = [];

                var name = document.createElement("div");
                name.innerText = data.data[id].name;
                list.push(name);

                var year = document.createElement("div");
                year.innerText = data.data[id].year;
                list.push(year);

                data.data[id].description.forEach(descriptions => {
                    var description = document.createElement("div");
                    description.innerText = descriptions;
                    list.push(description);
                });

                data.data[id].technologies.forEach(technologies => {
                    var technology = document.createElement("div");
                    technology.innerText = technologies;
                    list.push(technology);
                });

                list.forEach(item => {
                    document.getElementById("selected").appendChild(item);
                });

            } else if (fileName == "experience") {
                clearContent();
                var list = [];

                var name = document.createElement("div");
                name.innerText = data.data[id].name;
                list.push(name);

                var company = document.createElement("div");
                company.innerText = data.data[id].company;
                list.push(company);

                var date = document.createElement("div");
                date.innerText = data.data[id].date;
                list.push(date);

                var title = document.createElement("div");
                title.innerText = data.data[id].title;
                list.push(title);

                data.data[id].description.forEach(descriptions => {
                    var description = document.createElement("div");
                    description.innerText = descriptions;
                    list.push(description);
                });

                list.forEach(item => {
                    document.getElementById("selected").appendChild(item);
                });

            } else {
                fetch(file)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load ${file}`);
                        }
                        return response.text();
                    })
                    .then(html => {
                        console.log(`${typeof html} `);

                        contentDiv.innerHTML = html;
                    })
                    .catch(error => {
                        contentDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                    });
            }
        })
        .catch(error => {
            console.error(`Error loading JSON data: ${error.message}`);
        });

    if (document.getElementById("mobile-menu").style.display != "none") {
        toggleMenu();
    }
}

function onLoad() {
    console.log("Page loaded");
    loadContent("home");

    fetch(`data/experience.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load data/${fileName}.json`);
            }
            return response.json();
        })
        .then(data => {
            var list = [];
            var mobileList = [];

            data.data.forEach((item, index) => {
                var experience = document.createElement("div");
                experience.innerText = item.name + " @ " + item.company;
                experience.onclick = function () {
                    loadContent("experience", index);
                };
                list.push(experience);

                var mobileExperience = document.createElement("div");
                mobileExperience.innerText = item.name + " @ " + item.company;
                mobileExperience.onclick = function () {
                    loadContent("experience", index);
                };
                mobileList.push(mobileExperience);
            });

            list.forEach(item => {
                document.getElementById("experience").appendChild(item);
            });
            mobileList.forEach(item => {
                document.getElementById("mobile-experience").appendChild(item);
            });

        })
        .catch(error => {
            console.error(`Error loading JSON data: ${error.message}`);
        });

    fetch(`data/projects.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load data/${fileName}.json`);
            }
            return response.json();
        })
        .then(data => {
            var list = [];
            var mobileList = [];

            data.data.forEach((item, index) => {
                var project = document.createElement("div");
                project.innerText = item.name;
                project.onclick = function () {
                    loadContent("projects", index);
                };
                list.push(project);

                var mobileProject = document.createElement("div");
                mobileProject.innerText = item.name;
                mobileProject.onclick = function () {
                    loadContent("projects", index);
                };
                mobileList.push(mobileProject);
            });

            list.forEach(item => {
                document.getElementById("projects").appendChild(item);
            });
            mobileList.forEach(item => {
                document.getElementById("mobile-projects").appendChild(item);
            });

        })
        .catch(error => {
            console.error(`Error loading JSON data: ${error.message}`);
        });
}

function toggleMenu() {
    if (document.getElementById("mobile-menu").style.display == "none") {
        document.getElementById("mobile-menu").style.display = "block";
        document.getElementById("main").style.display = "none";
        document.getElementById("mobile-contact").style.display = "none";
    } else {
        document.getElementById("mobile-menu").style.display = "none";
        document.getElementById("main").style.display = "block";
        document.getElementById("mobile-contact").style.display = "block";

    }
}