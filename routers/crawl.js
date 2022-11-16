var express = require('express');
var router = express.Router();
const { crawlReleases } = require('../controllers/crawl.controller');
const { crawlCompareCommits } = require('../controllers/crawl.controller');


router.get('/releases', async function (req, res) {
    const repo = req.query.githubrepo;
    const dat = await crawlReleases(repo);
    res.render('crawlreleases', { data: dat.releaseData, owner: dat.owner, repo: dat.repo });
});


router.post('/comparecommits', async function (req, res) {
    const base = req.body.base;
    const head = req.body.head;
    const owner = req.body.owner;
    const repo = req.body.repo;
    const changelog = req.body.changelog;
    const compareCommits = await crawlCompareCommits(owner, repo, base, head);
    res.render('crawlcomparecommits', { data: compareCommits, changelog: changelog });
});

module.exports = router;