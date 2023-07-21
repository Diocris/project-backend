<h1>
Labecommerce backend project.
</h1>

<h3>
This project was made for study purposes, being part of a course taught by Labenu.
It simulates an ecommerce, where requisitions are sent through an API to database.
</h3>

</br>

<p>On this project I used concepts and tecnologies such as:</p>

<ul> 
<li>NodeJS</li>
<li>Typescript</li>
<li>Express</li>
<li>SQL & SQLite</li>
<li>Knex</li>
<li>Postman</li>
</ul>


<section>

<h2>Functionalities: </h2>

<h3><em>Get methods:</em></h3>
<ul><strong><h4>Get all users</h4></strong>
<li>Doesn't need params, it returns the users table.</li>
</br>

</ul>
<ul><strong><h4>Get products</h4></strong>
<li>If has no params passed, returns the products table.</li>
<li>If passed a param :name, finds the product that contains part or whole param inserted.</li>
<span>E.g. : </span><em style="font-size: 12px">"/products?name=name"</em>
</ul>

</br>
<ul><strong><h4>Get purchases by id</h4></strong>
<li>A param must be passed so it can find purchases by its id.</li>
<span>E.g. :</span><em style="font-size: 12px">"/purchases/:id"</em>
</ul>

</section>

</br>
</br>

<section>

<h3><em>Post methods:</em></h3>

<ul><strong><h4>Add new user</h4></strong>
<li>Body expects:
</br>
<blockquote>
{</br>
"id": "string", // should start with 'u' letter, followed by numbers. </br>
"name": "string", </br>
"email": "string",</br>
"password": "string" // must have at least an upper case letter, a number and a special caracter.</br>
}
</blockquote>
</li>
</ul>

</br>

<ul><strong><h4>Add new product</h4></strong>
<li>Body expects:
<blockquote>
{</br>
    "id" : "string", // should start with 'p' letter, followed by numbers</br>
    "name": "string", </br>
    "price": number,</br>
    "description":"string",</br>
    "image_url": "string"</br>
}
</blockquote>
</li>
</ul>

</br>

<ul><strong><h4>Add new purchase</h4></strong>

<li>Body expects:
<ol>
<li>ID is a string, starts with 'pch' followed by number to enumerate.</li>
<li>Buyer is a User ID</li>
<li>Products ID is a Product ID</li>
</ol>
</br>

<blockquote>
{</br>
    "id":"string", </br>
    "buyer": "string", </br>
    "products": [{</br>
                <div style="margin-left: 10%">
                "id": "string", </br>
                "quantity": number</br>
                },{</br>
                "id": "string",  
                "quantity": number</br>
                }]</br>
                </div>
}

</blockquote>
</li>
</ul>
</section>

<section>
</br></br>
<h3><em>Put methods:</em></h3>

<ul><strong><h4>Edit product</h4></strong>
<li>Body expects:
</br>
<blockquote>
{</br>
"name": "Monitor", </br>
"price": 200,</br>
"description": "Amazing monitor.",</br>
"imageUrl": "https://fakeimg.pl/600x400?text=monitor"</br>
}
</blockquote>
</li>
</ul>
</br>
<section>
</br></br>


<h3><em>Delete methods:</em></h3>

<ul><strong><h4>Delete user</h4></strong>
<li>Param expected e.g.:
</br>
<blockquote>
"/users/:id"
</blockquote>
</li>
</ul>
</br>
<ul><strong><h4>Delete product</h4></strong>
<li>Param expected e.g.:
</br>
<blockquote>
"/products/:id"
</blockquote>
</li>
</ul>
</br>
<ul><strong><h4>Delete purchase</h4></strong>
<li>Param expected e.g.:
</br>
<blockquote>
"/purchases/:id"
</blockquote>
</li>
</ul>