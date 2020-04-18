'run strict';

//all posts link - reset artykułów generateTitleLinks(customSelector) get element by id. add event listener click

{

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorsListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML)
  };

  /*Options*/

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
      titles: '.post-title',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  /*Titles*/

  /*titles Clickhandler*/
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

    /* for each active article */
    for(let activeArticle of activeArticles){

      /*remove active class*/
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  /*Generate title links*/
  function generateTitleLinks(customSelector = ''){

    /* find wrapper for titles*/
    const titleList = document.querySelector(select.listOf.titles);
    //console.log(titleList);

    /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(select.all.articles + customSelector);

    /* make html variable with empty string */
    let html = "";

    /* for each article */
    for (let article of articles) {

      /* get the article id */
      const getArticleId =  article.getAttribute("id");

      /* find the title element & get the title from the title element*/
      const articleTitle = article.querySelector(select.article.titles).innerHTML;

      /* create HTML of the link */
      const linkHTMLData = {id: getArticleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      //const linkHTML = '<li><a href="#' + getArticleId + '"><span>' + articleTitle + '</span></a></li>';

      /* html variable =  */
      html += linkHTML;
      /*End of loop for all articles*/
    }

    /* insert link into titleList */
    titleList.innerHTML = html;
    /*Event listener for click on links*/

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

    /*End generate title links*/
  }

  /*execute generatetitlelinks*/
  generateTitleLinks();

  /*Tags*/

  /*Tag class for tags cloud*/
  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    console.log('how many apears tag has:', count);
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );
    return opts.tagSizes.classPrefix + classNumber;
  }

  /*Generate tags*/
  function generateTags(){

    /*create a new variable allTags with an empty object*/
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsList = article.querySelector(select.article.tags);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute("data-tags");

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){

        /* generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */
        html = html + linkHTML;

        /* check if this link is NOT already in allTags */
        if(!allTags[tag]){

          /* add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;

    /* END LOOP: for every article: */
    }

    /* find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    /*create function that finds how many times tag is used*/
    function calculateTagsParams(tags) {
      /*max and minimal tag usage tags[tag] -> allTags[tag] (allTags[key])-> number from if(!allTags[tag]){}*/
      const params = {min: 99999, max: 0};

      /* Loop for every tag */
      for (let tag in tags){
        console.log(tag + ' is used ' + tags[tag] + ' times');
        console.log('tags', tags[tag]);
        /*if */
        if(tags[tag] > params.max){
          params.max = tags[tag];
        } else if(tags[tag] < params.min) {
          params.min = tags[tag];
        }
        /*End of loop */
      }
      return params;
    }
    const tagsParams = calculateTagsParams(allTags);
    console.log('allTags', allTags);
    console.log('tagsParams:', tagsParams);

    /*create variable for all links HTML code */
    //let allTagsHTML = '';

    const allTagsData = {tags: []};

    /*START LOOP: for each tag in allTags: */
    for (let tag in allTags){

      /*generate code of a link and add it to allTagsHTML */
      /*const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + ' (' + allTags[tag] + ') ' + '</span></a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);
      ;*/
      const tagLinkHTML = allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

      /*END LOOP: for each tag in allTags: */
    }

    /*add HTML from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData', allTagsData);
    console.log(tagList);

  /*End of generate tags*/
  }

  /*Execute generate tags*/
  generateTags();

  /*tags Clickhandler*/

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
    const activeLinks = document.querySelectorAll(select.all.linksTo.tags, '.active');

    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks){

      /* remove class active */
      activeLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll ('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks){

      /* add class active */
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

    /*Remove class from active author after click on tag*/

    const authorActiveLinks = document.querySelectorAll('.post-author a.active');
    for (let authorActiveLink of authorActiveLinks){

      /* remove class active */
      authorActiveLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /*end tagclickhandler*/
  }

  /*Tags clicklistener*/
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

    /*create a new variable allAuthors with an empty object*/
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find author wrapper */
      const authorWrap = article.querySelector(select.article.author);

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute("data-author");
      //console.log(articleAuthor);

      /* generate HTML of the link */
      //const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      //console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;

      if(!allAuthors[articleAuthor]){
        /* add tag to allTags object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* insert HTML of all the links into the author wrapper */
      authorWrap.innerHTML = html;

    /* END LOOP: for every article: */
    }

    /*Find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);

    //let allAuthorsHTML = '';
    const allAuthorsData = {authors: []};

    for (let articleAuthor in allAuthors){

      /*generate code of a link and add it to allTagsHTML */
      /*const authorLinkHTML = '<li><a class="author-name" href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ') ' + '</span></a></li>';
      console.log('authorLinkHTML:', authorLinkHTML);
      allAuthorsHTML += authorLinkHTML;*/
      const authorLinkHTML = allAuthorsData.authors.push({
        author: articleAuthor,
        count: allAuthors[articleAuthor]
      });

      /*END LOOP: for each tag in allTags: */
    }

    /*add HTML from allTagsHTML to tagList */

    authorList.innerHTML = templates.authorsListLink(allAuthorsData);
    console.log('allAuthorsData', allAuthorsData);
    console.log('authorList', authorList);
  }

  generateAuthor();

  function authorClickHandler(event){

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('author was clicked');

    /* find all author links with class active */
    const activeLinks = document.querySelectorAll(select.all.linksTo.authors, '.active');
    console.log('activeLinks', activeLinks);
    /* START LOOP: for each active author link */
    for (let activeLink of activeLinks){

      /* remove class active */
      activeLink.classList.remove('active');

    /* END LOOP: for each active author link */
    }
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');

    clickedElement.classList.add('active');
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll ('a[href="' + href + '"]');

    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks){

      /* add class active */
      authorLink.classList.add('active');

    /* END LOOP: for each found author link */
    }

    /*Remove class from active tag after click on author*/

    const tagActiveLinks = document.querySelectorAll('.post-tags a.active');
    for (let tagActiveLink of tagActiveLinks){

      /* remove class active */
      tagActiveLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  /*End of authorClickHandler*/
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

  function reset() {
    event.preventDefault();

    /*reset articlelist in right column*/
    generateTitleLinks(' ');

    /*remove active class for every link*/
    const activeLinks = document.querySelectorAll('a.active');
    console.log('activeLinks', activeLinks);

    /* START LOOP: for each active link */
    for (let activeLink of activeLinks){

      /* remove class active */
      activeLink.classList.remove('active');

    /* END LOOP: for each active link */
    }
  }

  document.getElementById('all-posts').addEventListener('click', function() { reset(event); });

}
