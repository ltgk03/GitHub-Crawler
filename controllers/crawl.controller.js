var { Octokit } = require("@octokit/rest");
var showdown = require('showdown');

const octokit = new Octokit({
    auth: "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"
});

const converter = new showdown.Converter();

const fetchReleaseData = async (owner, repo) => {
    var page = 0;
    var dataRaw = [];
    var dataPerPage = [];
    do {
        page++;
        const { data } = await octokit.repos.listReleases({
            owner,
            repo,
            per_page: 100,
            page
        });
        dataPerPage = data;
        dataRaw = dataRaw.concat(dataPerPage);
    } while (dataPerPage.length > 0);

    const release = await dataRaw.map((release) => {
        return {
            name: release.name,
            date: release.published_at,
            url: release.html_url,
            tag: release.tag_name,
            changelog: converter.makeHtml(release.body),
        };
    });
    return release;
}
async function crawlReleases(url) {
    const urlSplit = url.split("https://github.com/")[1].split("/");
    const owner = urlSplit[0];
    const repo = urlSplit[1];
    const releaseData = await fetchReleaseData(owner, repo);
    const result = {
        releaseData,
        owner,
        repo
    }
    return result;
}

async function crawlCompareCommits(owner, repo, base, head) {
    var page = 0;
    var dataRaw = [];
    var dataPerPage = [];
    do {
        page++;
        const { data } = await octokit.repos.compareCommits({
            owner,
            repo,
            base,
            head,
            per_page: 250,
            page
        });
        dataPerPage = data.commits;
        dataRaw = dataRaw.concat(dataPerPage);
    } while (dataPerPage.length > 0);


    const compareCommits = dataRaw.map((commit) => {
        return {
            sha: commit.sha,
            url: commit.html_url,
            message: processHtml(converter.makeHtml(commit.commit.message)),
        };
    });
    return compareCommits;
}

function processHtml(html) {
    let components = html.split(`</p>`);
    components[0] = components[0].slice(0, 3) + '<strong>' + components[0].slice(3);
    components[0] += "</strong>";
    return components.join(`</p>`);
}
module.exports = {
    crawlReleases,
    crawlCompareCommits
}