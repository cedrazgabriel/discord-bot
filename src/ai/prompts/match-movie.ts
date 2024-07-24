export interface sugestMovieParams {
    firstMovie: string
    secondMovie: string
}

export function generateMatchMoviePrompt({ firstMovie, secondMovie }: sugestMovieParams) {

    return `Me sugira um filme que combine com ${firstMovie} e ${secondMovie}.
            Se possível, me sugira um filme que combine com os dois.
            Mas, se por acaso você não souber, me consiga um filme aleatório.
            Se por acaso algum dos filmes citados não existir, retorne a seguinte mensagem:
            "Desculpe, não consegui encontrar o filme ${firstMovie} na minha base de dados."`;
}
