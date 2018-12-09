const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');
const Loading = require('./Loading');

function SelectLanguage({selectedLanguage, onSelect}){
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

    return(
        <ul className="languages">
            {languages.map((lang) => (
                <li style = {lang === selectedLanguage ? {color: '#d05250'}: null}
                    onClick = {() => onSelect(lang)}
                    key={lang}>
                        {lang}
                </li>
                )
            )}
        </ul>
    )
}

function RepoGrid({repos}) {
    return(
        <ul className="popular-list">
            {repos.map(({name, stargazers_count, owner, html_url, currentLang}, index) => (
                <li
                    key={name}
                    className="popular-item"
                >
                    <div className="popular-rank">#{index + 1}</div>
                    <ul className="space-list-items">
                        <li>
                            <a href={html_url}>
                                <img className="avatar" src={owner.avatar_url} alt={`Avatar for ${owner.login}`}/>
                            </a>
                        </li>
                        <li>
                            <a href={html_url}>{name}</a>
                        </li>
                        <li>@{owner.login}</li>
                        {currentLang === "All" ? <li>{repo.language === null ? "Utility" : repo.language}</li> : null}
                        <li>{stargazers_count}</li>
                    </ul>
                </li>
                ))}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
};

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};


class Popular extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang){
        // .setState always triggers a rerender of the page, based on the new state !
        this.setState(() => ({
                selectedLanguage: lang,
                repos: null,
        }));

        api.fetchPopularRepos(lang)
            .then((repos) => {this.setState(() => ({repos}))})
    }

    render(){
        const {selectedLanguage, repos} = this.state;

        return(
            <div>
                <SelectLanguage
                    selectedLanguage={selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {/*check if repos have been downloaded via API. If null - show "loading", else render RepoGrid*/}
                {!repos
                ? <Loading />
                : <RepoGrid repos={repos} currentLang={selectedLanguage}/>
                }
            </div>
        )
    }
}

module.exports = Popular;