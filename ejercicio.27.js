/*
    Programa una clase llamada Movie.

    La clase recibirá un objeto al momento de instanciarse con los siguentes datos: 
        .id de la película en IMDB 
        .titulo 
        .director
        .año de estreno 
        .país o países de origen
        .géneros  
        .calificación en IMBD.
    - Todos los datos del objeto son obligatorios.
    - Valida que el id IMDB tenga 9 caracteres, los primeros 2 sean letras y los 
        7 restantes números.
    - Valida que el título no rebase los 100 caracteres.
    - Valida que el director no rebase los 50 caracteres.
    - Valida que el año de estreno sea un número entero de 4 dígitos.
    - Valida que el país o paises sea introducidos en forma de arreglo.
    - Valida que los géneros sean introducidos en forma de arreglo.
    - Valida que los géneros introducidos esten dentro de los géneros 
        aceptados*.
    - Crea un método estático que devuelva los géneros aceptados*.
    - Valida que la calificación sea un número entre 0 y 10 pudiendo ser 
        decimal de una posición.
    - Crea un método que devuelva toda la ficha técnica de la película.
    - Apartir de un arreglo con la información de 3 películas genera 3 
        instancias de la clase de forma automatizada e imprime la ficha técnica 
        de cada película.

    * Géneros Aceptados: Action, Adult, Adventure, Animation, Biography, Comedy, Crime, Documentary ,Drama, Family,
      Fantasy, Film Noir, Game-Show, History, Horror, Musical, Music, Mystery, News, Reality-TV, Romance, Sci-Fi, 
      Short, Sport, Talk-Show, Thriller, War, Western.
*/


class Movie {
    constructor({id, title, director, age, country, genre, quelification}) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.age = age;
        this.country = country;
        this.genre = genre;
        this.quelification = quelification;
    
        this.validateIMDB(id);
        this.validateTitle(title);
        this.validateDirector(director);
        this.validateReleaseYear(age);
        this.validateCountry(country);
        this.validateGenres(genre);
        this.validateQualification(quelification);
    }

    static get listGenres() {
        return ["Action", "Adult", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", 
        "Drama", "Family", "Fantasy", "Film Noir", "Game-Show", "History", "Horror", "Musical", "Music", 
        "Mystery", "News", "Reality-TV", "Romance", "Sci-Fi", "Short", "Sport", "Talk-Show", "Thriller", 
        "War", "Western"];
    }

    static genresAccepted() {
        return console.info(`Los géneros aceptados son: ${Movie.listGenres.join(", ")}`);
    }

    validateString(property, value) {
        if (!value) return console.warn(`${property} '${value}' esta vació`);
        if (typeof value !== "string") return console.error(`${property} '${value}' ingresado, NO es una cadena de texto`);
        
        return true;
    }

    validateLength(property, value, length) {
        if (value.length > length) console.error(`${property} '${value}' excede el número de caracteres permitidos (${length})`); 
    
        return true;
    }

    validateArray(property, value) {
        if (!value) return console.warn(`${property} '${value}' esta vació`);
        if (!(value instanceof Array)) return console.error(`${property} '${value}' ingresado, NO es un arreglo`);
        if (value.length === 0) return console.error(`${property} '${value}' no tiene datos`);

        for (let string of value) {
            if (typeof string !== 'string') return console.error(`El valor '${string}' ingresado, NO es una cadena de texto`);
        } 

        return true;
    }

    validateIMDB (id) {
        if (this.validateString("IMDB id", id)) {
            if (!/^([a-z]{2}([0-9]{7}))$/.test(id)) {
                return console.error(`IMDB id '${id} no es válido, debe tener 9 caracteres, los 2 primeros letras minúsculas, los 7 restantes números'`);
            }
        }
    }

    validateTitle(title) {
        if (this.validateString("Title", title)){
            this.validateLength("Title", title, 100);
        }
    }

    validateDirector(director) {
        if (this.validateString("Director", director)){
            this.validateLength("Director", director, 50);
        }
    }

    validateReleaseYear(age) {
        if (!age) return console.warn(`El Año de Estreno '${age}' esta vació`);
        if (!(Number.isInteger(age))) console.error(`El año '${age}' no es un número entero`);
        if (!/^([0-9]){4}$/.test(age)) return console.error(`Año de estreno '${age}' no es válido, debe ser un número de 4 dígitos`);
    }

    validateCountry(country) {
        this.validateArray("Pais", country);
    }

    validateGenres(genres) {
        if (this.validateArray("Géneros", genres)) {
            for (let genre of genres) {
                if (!Movie.listGenres.includes(genre)){
                    console.error(`Género/s incorrecto/s '${genres.join(", ")}'`);
                    Movie.genresAccepted();
                } 
            }      
        }
    }

    validateQualification(qualification) {
        if (!qualification) return console.warn(`Calificación '${qualification}' esta vació`);
        if (typeof qualification !== 'number') return console.error(`El número '${qualification}' no es un número`);
        
        return (qualification < 0 || qualification > 10)
            ? console.error("La calificación tiene que estar en un rango de 0 y 10")
            : this.quelification = qualification.toFixed(1);
    }

    dataSheet() {
        console.info(`FICHA TÉCNICA:\nTítulo: ${this.title}\nDirector: ${this.director}\nEstreno: ${this.age}\nPaís/es: ${this.country.join(" - ")}\nGénero/s: ${this.genre.join(", ")}\nCalificación: ${this.quelification}\nIMDB Id: ${this.id}`);
    }

}

console.info("EJERCICIO 27");
Movie.genresAccepted();
const peli = new Movie ({
    id: "tt0087123",
    title: "Avengers",
    director: "Stanly",
    age: 2013,
    country: ["Estados Unidos", "México"],
    genre: ["Action", "Fantasy"],
    quelification: 8
});
peli.dataSheet();

console.info("---------------------------------------------------------------------------------------------------");
misPelis = [
    {
        id: "tt0087123",
        title: "Into the Wild",
        director: "Sean Penn",
        age: 2007,
        country: ["USA"],
        genre: ["Adventure", "Biography", "Drama"],
        quelification: 8.1
    },
    {
        id: "tt0087124",
        title: "Rocky Balboa",
        director: "Sylvester Stallone",
        age: 2006,
        country: ["USA"],
        genre: ["Action", "Drama", "Sport"],
        quelification: 7.1
    },
    {
        id: "tt0087125",
        title: "The Drak Knigth",
        director: "Christopher Nolan",
        age: 2008,
        country: ["USA", "UK"],
        genre: ["Action", "Crime", "Drama"],
        quelification: 9.0
    }
]
misPelis.forEach(el => new Movie(el).dataSheet());