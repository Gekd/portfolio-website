require("dotenv").config()

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
            document.getElementById("selected").className = "terminal";

            if (fileName == "projects") {
                clearContent();
                var list = [];

                var project = document.createElement("div");
                var projectTitle = document.createElement("p");
                projectTitle.innerHTML = `
                    <span class="green-text">robin@otter</span>:<span class="blue-text">~</span>$ cat /${data.data[id].name}.txt
                    `;
                project.className = "terminal-line"
                project.appendChild(projectTitle);
                list.push(project);

                var year = document.createElement("div");
                year.className = "terminal-line"
                var yearP = document.createElement("p");
                yearP.innerHTML = `year: <span class="blue-text">${data.data[id].year}</span>`;
                year.appendChild(yearP);
                list.push(year);

                data.data[id].description.forEach(descriptions => {
                    var description = document.createElement("div");
                    description.className = "terminal-line"
                    var descriptionP = document.createElement("p");
                    descriptionP.innerText = descriptions;
                    description.appendChild(descriptionP);
                    list.push(description);
                });

                var technology = document.createElement("div");
                technology.className = "terminal-line"
                var technologyP = document.createElement("p");
                technologyP.innerHTML = `technologies: <span class="green-text">${data.data[id].technologies}</span>`;
                technology.appendChild(technologyP);
                list.push(technology);

                if (data.data[id].githubUrl) {
                    var link = document.createElement("div");
                    link.className = "terminal-line"
                    var linkA = document.createElement("a");
                    linkA.href = data.data[id].githubUrl;
                    linkA.innerHTML = `link: <span class="yellowish-text"> Available on Github </span>`;
                    link.appendChild(linkA);
                    list.push(link);
                }
                if (data.data[id].websiteUrl) {
                    var link = document.createElement("div");
                    link.className = "terminal-line"
                    var linkA = document.createElement("a");
                    linkA.href = data.data[id].websiteUrl;
                    linkA.innerHTML = `link: <span class="yellowish-text"> Available on Website </span>`;
                    link.appendChild(linkA);
                    list.push(link);
                }


                list.forEach(item => {
                    document.getElementById("selected").appendChild(item);
                });

            } else if (fileName == "experience") {
                clearContent();
                var list = [];

                var project = document.createElement("div");
                var projectTitle = document.createElement("p");
                projectTitle.innerHTML = `
                    <span class="green-text">robin@otter</span>:<span class="blue-text">~</span>$ cat /${data.data[id].name}.txt
                `;
                project.className = "terminal-line"
                project.appendChild(projectTitle);
                list.push(project);

                var company = document.createElement("div");
                company.className = "terminal-line"
                var companyP = document.createElement("p");
                companyP.innerHTML = `<span class="yellowish-text">@</span> ${data.data[id].company}`;
                company.appendChild(companyP);
                list.push(company);



                var date = document.createElement("div");
                date.className = "terminal-line"
                var dateP = document.createElement("p");
                dateP.innerHTML = `year: <span class="blue-text">${data.data[id].date}</span>`;
                date.appendChild(dateP);
                list.push(date);

                var title = document.createElement("div");
                title.className = "terminal-line"
                var titleP = document.createElement("p");
                titleP.innerHTML = `title: <span class="green-text">${data.data[id].title}</span>`;
                title.appendChild(titleP);
                list.push(title);

                data.data[id].description.forEach(descriptions => {
                    var description = document.createElement("div");
                    description.className = "terminal-line"
                    var descriptionP = document.createElement("p");
                    descriptionP.innerText = descriptions;
                    description.appendChild(descriptionP);
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
    loadContent('home');

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
        document.getElementById("mobile-menu").style.display = "flex";
        document.getElementById("main").style.display = "none";
        document.getElementById("mobile-contact").style.display = "none";
    } else if (window.innerWidth < 768) {
        document.getElementById("mobile-menu").style.display = "none";
        document.getElementById("main").style.display = "block";
        document.getElementById("mobile-contact").style.display = "block";

    }
}