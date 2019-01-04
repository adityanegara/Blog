1. REST = REPRESENTATIONAL STATE TRANSFER
2. REST = ialah pola untuk membuat route dan CRUD
3. 
Name                Path                HTTP verb               Purpose
=================================================================================================
index               /dogs               GET                     List all dogs
New                 /dogs/new           GET                     Show a dog form
Create              /dogs               POST                    Create a new dog, then redirect somewhere
Show                /dogs/:id           GET                     Show specific dog
Edit                /dogs/:id/edit      GET                     Show a edit form of dog
Update              /dogs/:id           PUT                     Update a particular dog, then redirect somewhere
Destroy             /dogs/:id           DELETE                  Delete a particular dog, then redirect somewhere

4. html 5 tidak mensupport PUT dan Delete route jadi harus menginstall
5. npm install method-override
6. Express sanitizer untuk menghindari dari user menulis script
7. 