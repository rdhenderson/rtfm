# Simplify My Code
<i>"I can't RTFM"</i>
<p>This application will search for simplified documentation and examples based on a snippet of code that the user inputs. The search results will display multiple code examples and/or documentation related to the search term.</p>

# GIT Team Guidelines  

* Update your local files <i> frequently </i> by running "git pull origin master" to make sure your code is up-to-date and to avoid merge conflicts.
* Creating a new feature branch (every time you start work on a new issue/feature):
  - git checkout -b feature-branch-name (creates the new branch and switches to that branch)
  - git pull origin master (makes sure that your branch is up-to-date)
* Committing work on your branch
  - git add .  (all files/folders in current directory) OR  git add <filename> (just add a single file if that's all that changed)
  - git commit -m "short but descriptive commit message about what changed"
  - git push origin feature-branch-name
* Making pull request when feature is complete
  - Commit final feature to your branch (as above)
  - Go to [Github repository](https://github.com/rdhenderson/rtfm)
  - You should see yellow box listing your recently pushed branches.  Click green button on right "Compare & pull request"
  - Leave a brief message about the changes in comment box on following page
  - Click on "reviewers" on right hand side to assign someone to review your pull request
  - Click green "Create pull request" button when you're finished
* Reviewing a pull request
  - Go to [Github repository](https://github.com/rdhenderson/rtfm)
  - Go to "pull requests" tab and select the pull request you want to merge
  - Review the changes and resolve conflicts [docs](https://help.github.com/articles/resolving-a-merge-conflict-on-github/)
  - Click green "merge pull request" button to merge the branch into the master branch
