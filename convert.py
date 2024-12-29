from json import dumps
names = []
output = []
with open("data.txt", 'r') as data:
    input_list = data.read().splitlines()

for index, line in enumerate(input_list):
    parts = line.split("\t")
    if index == 0:
        for name in parts:
            names.append(name)
    else:
        o = {}
        missing = 0
        for i in range(len(names)):
            v = parts[i]
            if not v:
                if len(output) > 0 and i < 2: 
                    v = output[-1][names[i]]
                else:
                    v = ""
                missing += 1
            o[names[i]] = v
        if missing < len(names):
            output.append(o)
with open("output.json", "w") as out:
    out.write(dumps(output))