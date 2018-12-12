import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'

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

    state = {
        selectedLanguage: 'All',
        repos: null
    };

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage = async (lang) => {
        // .setState always triggers a rerender of the page, based on the new state !
        this.setState(() => ({
                selectedLanguage: lang,
                repos: null,
        }));

        const repos = await fetchPopularRepos(lang);
        this.setState(() => ({repos}));
    };

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

export default Popular;