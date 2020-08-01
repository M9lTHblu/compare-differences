const stylishFormat = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}`;

const plainFormat = `Property 'common.follow' was added with value: 'false'
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From 'true' to '[complex value]'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: '[complex value]'
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From '[complex value]' to 'str'
Property 'group2' was removed
Property 'group3' was added with value: '[complex value]'`;

const jFormat = '[{"name":"common","child":[{"name":"follow","value":false,"type":"added"},{"name":"setting1","value":"Value 1","type":"unchanged"},{"name":"setting2","value":200,"type":"deleted"},{"name":"setting3","oldValue":true,"newValue":{"key":"value"},"type":"changed"},{"name":"setting4","value":"blah blah","type":"added"},{"name":"setting5","value":{"key5":"value5"},"type":"added"},{"name":"setting6","child":[{"name":"doge","child":[{"name":"wow","oldValue":"too much","newValue":"so much","type":"changed"}],"type":"nested"},{"name":"key","value":"value","type":"unchanged"},{"name":"ops","value":"vops","type":"added"}],"type":"nested"}],"type":"nested"},{"name":"group1","child":[{"name":"baz","oldValue":"bas","newValue":"bars","type":"changed"},{"name":"foo","value":"bar","type":"unchanged"},{"name":"nest","oldValue":{"key":"value"},"newValue":"str","type":"changed"}],"type":"nested"},{"name":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"name":"group3","value":{"fee":100500,"deep":{"id":{"number":45}}},"type":"added"}]';


export { stylishFormat, plainFormat, jFormat };
