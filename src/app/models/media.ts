export class Media {
    id: number = 0
    name: string = ""
    icon: string = ""
    path: string = ""
    thumb: string = ""
    type: string = ""
    extension: string = ""
    size: string = ""
    parent: number = 0
    status: boolean = true
    created_at: Date = null
    updated_at: Date = null
    active: boolean = false
    public_path : string;
    select :boolean = false;
    is_cut : boolean = false;
    is_image : boolean = false;
}
