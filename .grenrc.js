module.exports = {
    "dataSource": "milestones",
    "prefix": "",
    "changelogFilename": "CHANGELOG.md",
    "ignoreIssuesWith": [
        "duplicate",
        "wontfix",
        "invalid",
        "help wanted",
        "question",
        "testing",
        "test"
    ],
    "template": {
        "issue": "- [{{text}}]({{url}}) {{name}}"
    },
    "groupBy": {
        "Breaking changes:": ["breaking/api"],
        "Enhancements:": ["enhancement"],
        "Bug Fixes:": ["bug"],
        "Documentation:": ["documentation"],
        "Styling:": ["styling"],
        "Other:": ["chore", "refactor"]
    }
};