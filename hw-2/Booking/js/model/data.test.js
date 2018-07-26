import assert from 'assert';
import {getFinalCost} from './data';

describe(`Проверка правильности рассчёта стоимости бронирования номера`, () => {
  it(`Считает стоимость брони отеля на заданное количество дней`, () => {
    assert.equal(getFinalCost(2, 3), 6);
    assert.equal(getFinalCost(3, 1500), 4500);
    assert.equal(getFinalCost(3, 3000), 9000);
    assert.equal(getFinalCost(7, 3000), 21000);
    assert.equal(getFinalCost(2, 900), 1800);
    assert.equal(getFinalCost(5, 0), 0);
    assert.equal(getFinalCost(1, 3000), 3000);
    assert.equal(getFinalCost(4, 1500), 6000);
  });
});
