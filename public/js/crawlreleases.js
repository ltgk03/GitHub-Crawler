var infor = document.getElementById('infor').getAttribute('value').split('/');
var owner = infor[0];
var repo = infor[1];
function showCompareCommits(id) {
    if (id > 1) {
        const head = document.getElementById(`${id}`).getAttribute('value');
        const base = document.getElementById(`${id - 1}`).getAttribute('value');
        const changelog = document.getElementById(`${id}`).querySelector('#changelog').innerHTML;

        const submitForm = document.createElement('form');
        submitForm.setAttribute('method', 'post');
        submitForm.setAttribute('action', `/comparecommits`);

        submitForm.appendChild(createInputOwner(owner));
        submitForm.appendChild(createInputRepo(repo));
        submitForm.appendChild(createInputBase(base));
        submitForm.appendChild(createInputHead(head));
        submitForm.appendChild(createInputChangelog(changelog));

        submitForm.setAttribute('visibility', 'hidden');
        document.body.appendChild(submitForm);
        submitForm.submit();

    }

}

function createInputOwner(owner) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'owner');
    input.setAttribute('value', owner);
    return input;
}

function createInputRepo(repo) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'repo');
    input.setAttribute('value', repo);
    return input;
}

function createInputBase(base) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'base');
    input.setAttribute('value', base);
    return input;
}

function createInputHead(head) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'head');
    input.setAttribute('value', head);
    return input;
}

function createInputChangelog(changelog) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'changelog');
    input.setAttribute('value', changelog);
    return input;
}

