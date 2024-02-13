import OpenAI from "openai";

interface Options{
    prompt: string;
}

export const orthographyUseCase = async ( openAi: OpenAI, options: Options)=> {

    const { prompt } = options;
    
    const completion = await openAi.chat.completions.create({
      messages: [{
        role: "system",
        content: `
            Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
            las palabras usadas deben  de existir en el diccionario de la real academia española,
            Debes responder en foramto JSON,
            Tu tarea es corregirlos y retornar información de soluciones,
            tambien debes dar el porcentaje de acierto tue tuvo el usuario,
            Si no hay errores debes retornar un mensaje de felicitaciones. 
            Ejemplo de salida:
            {
                userScore: number,
                errors: string[], //['error -> solución']
                message: string //Usa emojis y texto para felicitar al usuario
            }
        `
    },{
        role: "user",
        content: prompt
    }],
      model: "gpt-3.5-turbo-1106",
      temperature: 0.3,
      max_tokens: 150,
      response_format: {
        type: "json_object"
      }
    });
    
    console.log(completion);
    return JSON.parse(completion.choices[0].message.content);  

}