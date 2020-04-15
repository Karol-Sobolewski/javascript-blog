'run strict';

{
  const titleClickHandler = function(event){

    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('target', targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  function generateTitleLinks(customSelector = ''){

    /* find wrapper for titles*/
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);

    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    /* for each article */
    let html = "";
    for (let article of articles) {

      /* get the article id */
      const getArticleId =  article.getAttribute("id");

      /* find the title element & get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + getArticleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */
      //titleList.insertAdjacentHTML('beforeend', linkHTML);
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function generateTags(){

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute("data-tags");
      //console.log(articleTags)

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';

        /* add generated code to html variable */
        html = html + linkHTML;

      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;

    /* END LOOP: for every article: */
    }
  }

  generateTags();

  function tagClickHandler(event){

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('tag was clicked');

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeLinks = article.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks){

      /* remove class active */
      activelink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = article.querySelectorAll ('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks){

      /* add class active */
      tagLink.classList.add('acive');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags(){

    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a');

    /* START LOOP: for each link */
    for(let link of links){

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthor(){

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find author wrapper */
      const authorWrap = article.querySelector(optArticleAuthorSelector);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute("data-author");
      console.log(articleAuthor);

      /* generate HTML of the link */
      const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* insert HTML of all the links into the author wrapper */
      authorWrap.innerHTML = html;

    /* END LOOP: for every article: */
    }
  }

  generateAuthor();

  function authorClickHandler(event){

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('author was clicked');

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all author links with class active */
    const activeLinks = article.querySelectorAll('a.active[href="#author-"]');

    /* START LOOP: for each active author link */
    for (let activeLink of activeLinks){

      /* remove class active */
      activeLink.classList.remove('active');

    /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = article.querySelectorAll ('a[href="' + href + '"]');

    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks){

      /* add class active */
      authorLink.classList.add('acive');

    /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthor(){

    /* find all links to author */
    const links = document.querySelectorAll('.post-author a');

    /* START LOOP: for each link */
    for(let link of links){

      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthor();

}
