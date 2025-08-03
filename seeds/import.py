from random import randint
from pymongo import MongoClient
import unidecode

def generate(x_value):

    nombres = ["Isabella","Sofía","Agustina","Emilia","Josefa","Isidora","Emma","Trinidad","Florencia","Julieta","Maite","María","Amanda","Antonella","Martina","Valentina","Catalina","Leonor","Renata","Mia","Mateo","Agustín","Santiago","Tomás","Benjamín","Lucas","Gaspar","Alonso","Vicente","Maximiliano","Joaquín","Matías","Martín","José","Luciano","Facundo","Julián","Gabriel","Máximo","Juan"]
    apellidos = ["Gonzalez","Muñoz","Rojas","Diaz","Perez","Soto","Contreras","Silva","Martinez","Sepulveda","Morales","Rodriguez","Lopez","Araya","Fuentes","Hernandez","Torres","Espinoza","Flores","Castillo","Valenzuela","Ramirez","Reyes","Gutierrez","Castro","Vargas","Alvarez","Vasquez","Tapia","Fernandez","Sanchez","Cortes","Gomez","Herrera","Carrasco","Nuñez","Miranda","Jara","Vergara","Rivera","Figueroa","Garcia","Bravo","Riquelme","Vera","Vega","Molina","Campos","Sandoval","Olivares","Orellana","Zuñiga","Ortiz","Gallardo","Alarcon","Garrido","Salazar","Pizarro","Aguilera","Saavedra","Romero","Guzman","Henriquez","Navarro","Peña","Aravena","Godoy","Caceres","Parra","Leiva","Escobar","Yañez","Valdes","Salinas","Vidal","Jimenez","Lagos","Ruiz","Cardenas","Bustos","Medina","Maldonado","Pino","Moreno","Carvajal","Palma","Sanhueza","Poblete","Navarrete","Saez","Toro","Donoso","Ortega","Venegas","Bustamante","Alvarado","Acevedo","Farias","Acuña","Guerrero"]

    nombres_value1 = randint(0, 39)
    nombres_value2 = randint(0, 39)
    nombres_value3 = randint(20, 39)
    nombres_value4 = randint(20, 39)
    nombres_value5 = randint(0, 18)
    nombres_value6 = randint(0, 18)
    nombres_value7 = randint(0, 39)
    nombres_value8 = randint(0, 39)
    nombres_value9 = randint(20, 39)
    nombres_value10 = randint(20, 39)

    apellidos_value1 = randint(0, 99)
    apellidos_value2 = randint(0, 99)
    apellidos_value3 = randint(0, 99)
    apellidos_value4 = randint(0, 99)
    apellidos_value5 = randint(0, 99)
    apellidos_value6 = randint(0, 99)
    apellidos_value7 = randint(0, 99)
    apellidos_value8 = randint(0, 99)
    apellidos_value9 = randint(0, 99)

    year = 0
    while year < 1997:
        if year > 2005 or year < 1997:
            year = randint(1997, 2005)

    obs = randint(0, 1)
    obs_inf = -1
    if obs == 1:
        obs_inf = randint(0, 1)

    obs_format = ""

    datemonth = randint(1, 12)
    if (datemonth < 10):
        datemonth = str(0)+str(datemonth)
    dateday = randint(1, 30)
    if (dateday < 10):
        dateday = str(0)+str(dateday)

    datemonth1 = randint(1, 12)
    if (datemonth1 < 10):
        datemonth1 = str(0)+str(datemonth1)
    dateday1 = randint(1, 30)
    if (dateday1 < 10):
        dateday1 = str(0)+str(dateday1)
    
    datemonth2 = randint(1, 12)
    if (datemonth2 < 10):
        datemonth2 = str(0)+str(datemonth2)
    dateday2 = randint(1, 30)
    if (dateday2 < 10):
        dateday2 = str(0)+str(dateday2)

    if obs_inf == 0:
        obs_format = "Se confirmo el "+str(dateday)+"/"+str(datemonth)+"/"+str(randint(15, 20))+", en la parroquia Santo Toribio, por el P. "+nombres[nombres_value9]+" "+apellidos[apellidos_value7]
    if obs_inf == 1:
        obs_format = "Contrajo matrimonio el "+str(dateday)+"/"+str(datemonth)+"/"+str(randint(15, 20))+", con "+nombres[nombres_value10]+" "+apellidos[apellidos_value8]+", en la parroquia Santo Toribio"

    return [str(x_value), apellidos[apellidos_value1]+" "+apellidos[apellidos_value2], nombres[nombres_value1]+" "+nombres[nombres_value2], nombres[nombres_value3]+" "+nombres[nombres_value4]+" "+apellidos[apellidos_value1]+" "+apellidos[apellidos_value3], nombres[nombres_value5]+" "+nombres[nombres_value6]+" "+apellidos[apellidos_value2]+" "+apellidos[apellidos_value4],"",nombres[nombres_value7]+" "+apellidos[apellidos_value5], nombres[nombres_value8]+" "+apellidos[apellidos_value6], "", str(year)+"."+str(dateday1)+"."+str(datemonth1), str(year)+"."+str(dateday2)+"."+str(datemonth2), "Santo Toribio", "P. "+nombres[nombres_value9]+" "+apellidos[apellidos_value7], "", obs_format,str(randint(1,20))+"."+str(randint(100,999))+"."+str(randint(100,999))+"-"+str(randint(1,9)),str(randint(1,100)),randint(1,100),4]

def createSuperUser():
    dbname = get_database()

    defaultpassword = {
        "password": "$2b$10$JnA6k4nBCsJ/TiU1Q8hjDevYA6b3OKDRuk1c2BzJJqe1y54v.KueW",
    }
    password = dbname["passwords"].insert_one(defaultpassword)
    defaultuser = {
        "name": "Párroco",
        "nameE": "parroco",
        "lastname": "Apellido",
        "lastnameE": "apellido",
        "email": "123@123.com",
        "password_id": password.inserted_id,
        "rol": "*",
        "phone": "",
    }
    user = dbname["usuarios"].insert_one(defaultuser)
    print("Se ha creado el superusuario en la id: "+str(user.inserted_id))


def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb://localhost:27017" #"mongodb+srv://<mongo_external_url>"
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   mydb =  client['IglesiaDigitalizada']

   return mydb

def main():
    createSuperUser()
    
    how_many = 222
    x_value = 0
    nid = 0
    nnid = 2000
    dbname = get_database()

    while(x_value < how_many):
        x = generate(x_value)
        naci = str(x[9]).replace("-", ".")
        nacimiento_no_space = naci.replace(" ", "")
        nacimiento = nacimiento_no_space.split(".")

        celeb = str(x[10]).replace("-", ".")
        celebracion_no_space = celeb.replace(" ", "")
        celebracion = celebracion_no_space.split(".")
        doc1 = ""
        doc2 = ""
        doc3 = ""
        doc4 = ""
        doc5 = ""
        print(celebracion)
        print(nacimiento)

        formated_celeb = ""
        formated_naci = ""
        if x[9] != "":
            formated_naci = str(nacimiento[0])+"-"+str(nacimiento[2])+"-"+str(nacimiento[1])

        if x[10] != "":
            formated_celeb = str(celebracion[0])+"-"+str(celebracion[2])+"-"+str(celebracion[1])

        indice = ""
        if x[16] != "":
            indice = str(int(x[16]))
        
        confirmacion = {}
        if "confirmo" in x[14] or "Confirmo" in x[14]:
            obs = x[14].split()
            dia = obs[3].replace(",", "")
            dia1 = dia.replace(".", "")
            dia2 = dia.split("/")
            print(dia2)
            confirmado_day = str("20"+str(dia2[2])+"-"+str(dia2[1])+"-"+str(dia2[0]))
            place1 = obs[6].upper()
            until = 0
            for i,j in enumerate(obs):
                if j == "por":
                    until = i
            place2 = ""
            for i,j in enumerate(obs):
                if i > 6 and i < int(until):
                    if i == 7:
                        place2 = obs[7]
                    elif i > 7:
                        place2 = place2+" "+obs[i].replace(",", "")

            father = ""

            for i,j in enumerate(obs):
                if (i > int(until)+1 and i < len(obs)):
                    if i == int(until)+2:
                        father = obs[i]
                    elif i > int(until)+2:
                        father = father+" "+obs[i]

            confirmacion = {
                "c_place1": place1,
                "c_place2": place2,
                "c_date": confirmado_day,
                "c_father": father,
                "c_padrino": "",
                "c_madrina": "",
            }
            doc4 = dbname["confirmacions"].insert_one(confirmacion)
        matrimonio = {}
        if "matrimonio" in x[14] or "Matrimonio" in x[14]:  
            obs = x[14].split()
            dia = obs[3].replace(",", "")
            dia1 = dia.replace(".", "")
            dia2 = dia1.split("/")
            print(dia2)
            confirmado_day = str("20"+str(dia2[2])+"-"+str(dia2[1])+"-"+str(dia2[0]))

            until = 0
            for i,j in enumerate(obs):
                if j == "en":
                    until = i

            partner = ""
            for i,j in enumerate(obs):
                if i > 4 and i < int(until):
                    if i == 5:
                        partner = obs[5]
                    elif i > 5:
                        partner = partner+" "+obs[i].replace(",", "")

            place1 = obs[int(until)+2].upper()
            place2 = ""
            for i,j in enumerate(obs):
                if i > int(until)+2:
                    if i == 7:
                        place2 = obs[7]
                    elif i > 7:
                        place2 = place2+" "+obs[i].replace(",", "")
            matrimonio = {
                "m_place1": place1,
                "m_place2": place2,
                "m_partner_name": partner,
                "m_partner_lastname": "",
                "m_date": confirmado_day,
                "m_father": "",
                "m_padrino": "",
                "m_madrina": "",
            }
            doc3 = dbname["matrimonios"].insert_one(matrimonio)
        bautismo = {
            "b_place1": "",
            "b_place2": x[11],
            "b_date": formated_celeb,
            "b_father": x[12],
            "b_padrino": x[6],
            "b_padrino_data": {
                "older": False,
                "bautizado": False,
                "p_comunion": False,
                "confirmado": False,
                "casado": False,
                "casado_iglesia": False
            },
            "b_madrina": x[7],
            "b_madrina_data": {
                "older": False,
                "bautizado": False,
                "p_comunion": False,
                "confirmado": False,
                "casado": False,
                "casado_iglesia": False
            },
        }
        doc1 = dbname["bautismos"].insert_one(bautismo)
        parent_data = {
            "p_father": x[3],
            "p_mother": x[4],
            "p_phone_father": "",
            "p_phone_mother": "",
            "p_lugar": "",
            "p_parent_Status": "",
            "p_relation": "",
        }
        doc2 = dbname["padresymadres"].insert_one(parent_data)
        if nid > int(x[0]):
            nnid = nnid + 1

        documento = {
            "n_id": str(x[0])+"/"+str(nnid),
            "rut": x[15],
            "name": x[2],
            "nameE":  unidecode.unidecode(x[2]).lower(),
            "lastname": x[1],
            "lastnameE": unidecode.unidecode(x[1]).lower(),
            # esto esta originalmente en formato YYYY.DD.MM y se cambio a YYYY-MM-DD
            "birth": formated_naci,
            "birthplace": "",
            "email": "",
            "Obs": x[14],
            "inscr_Date": formated_celeb,
            "address": "",
            "phone": x[5],
            "Tomo": x[18],
            "Pag": x[17],
            "Referencia": indice,
            "parent_Data":{
                "p_id": doc2.inserted_id if doc2 != "" else ""
            },
            "Bautismo":{
                "b_id": doc1.inserted_id if doc1 != "" else ""
            },
            "Confirmacion":{
                "c_id": doc4.inserted_id if doc4 != "" else ""
            },
            "Matrimonio": {
                "m_id": doc3.inserted_id if doc3 != "" else ""
            },
        }
        
        doc5 = dbname["documentos"].insert_one(documento)
        print( doc5.inserted_id)
        nid = int(x[0])
        x_value = x_value + 1
    print("done!")
    print(nid)

main()