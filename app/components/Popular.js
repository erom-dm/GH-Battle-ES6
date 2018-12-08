let React = require('react');
let PropTypes = require('prop-types');
let api = require('../utils/api');
let Loading = require('./Loading');

//regular components
/*class SelectLanguage extends React.Component{
    render(){
        var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
        return(
            <ul className="languages">
                {languages.map(function(lang) {
                    return(
                        <li
                            style = {lang === this.props.selectedLanguage ? {color: '#d05250'}: null}
                            onClick = {this.props.onSelect.bind(null, lang)}
                            key={lang}
                        >
                            {lang}
                        </li>
                    )
                }, this)}
            </ul>
        )
    }
}*/

// functional stateless component


function SelectLanguage(props){
    let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

    return(
        <ul className="languages">
            {languages.map((lang) => {
                return(
                <li
                    style = {lang === props.selectedLanguage ? {color: '#d05250'}: null}
                    onClick = {props.onSelect.bind(null, lang)}
                    key={lang}
                >
                    {lang}
                </li>
                )}
            )}
        </ul>
    )
}

function RepoGrid(props) {
    return(
        <ul className="popular-list">
            {props.repos.map((repo, index) => {
                return (
                <li
                    key={repo.name}
                    className="popular-item"
                >
                    <div className="popular-rank">#{index + 1}</div>
                    <ul className="space-list-items">
                        <li>
                            <a href={repo.html_url}>
                                <img className="avatar" src={repo.owner.avatar_url} alt={`Avatar for ${repo.owner.login}`}/>
                            </a>
                        </li>
                        <li>
                            <a href={repo.html_url}>{repo.name}</a>
                        </li>
                        <li>@{repo.owner.login}</li>
                        {props.currentLang === "All" ? <li>{repo.language === null ? "Utility" : repo.language}</li> : null}
                        <li>{repo.stargazers_count}</li>
                    </ul>
                </li>
                )
            })}
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
        this.setState(() => {
            return{
                selectedLanguage: lang,
                repos: null,
            }
        });

        api.fetchPopularRepos(lang)
            .then((repos) => {
                this.setState(() => {
                    return{
                        repos: repos
                    }
                })
            })
    }

    render(){
        return(
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {/*check if repos have been downloaded via API. If null - show "loading", else render RepoGrid*/}
                {!this.state.repos
                ? <Loading />
                : <RepoGrid repos={this.state.repos} currentLang={this.state.selectedLanguage}/>
                }
            </div>
        )
    }
}

module.exports = Popular;